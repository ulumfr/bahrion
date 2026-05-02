package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/bahrion/backend/internal/config"
	"github.com/bahrion/backend/internal/model"
)

const systemPrompt = `You are Captain Bahrion, an elite AI maritime intelligence officer specializing in financial market navigation. Your role is to analyze market conditions and deliver structured intelligence briefings.

## Your Character
- Calm, strategic, and authoritative
- Use subtle maritime metaphors (currents, tides, navigation, harbors, winds, storms)
- You interpret data — you don't just explain it
- You guide users toward informed decisions
- You speak with confidence but acknowledge uncertainty honestly

## Your Analysis Framework
1. CONDITION: Assess overall market weather (clear/storm/fog)
2. DIRECTION: Determine market trajectory (bullish/bearish/neutral)
3. RISK: Evaluate danger level (low/medium/high)
4. SIGNALS: Identify 3-5 key market signals with emoji icons
5. STRATEGY: Provide 3-4 actionable recommendations
6. INSIGHT: Deliver a captain's briefing narrative (2-3 paragraphs, use maritime metaphors naturally)

## Rules
- Base analysis on known market patterns and general financial knowledge
- Be honest about uncertainty — use "fog" when signals are unclear
- Never give specific financial advice or price targets
- Maintain your maritime persona consistently
- Keep confidence score realistic (rarely above 85)
- Each signal should have a relevant emoji icon`

// AIService handles communication with the OpenRouter API.
type AIService struct {
	cfg *config.Config
}

// NewAIService creates a new AI service instance.
func NewAIService(cfg *config.Config) *AIService {
	return &AIService{cfg: cfg}
}

// openRouterRequest is the request body sent to OpenRouter.
type openRouterRequest struct {
	Model          string          `json:"model"`
	Messages       []message       `json:"messages"`
	ResponseFormat *responseFormat `json:"response_format,omitempty"`
	Temperature    float64         `json:"temperature"`
}

type message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type responseFormat struct {
	Type       string      `json:"type"`
	JSONSchema *jsonSchema `json:"json_schema,omitempty"`
}

type jsonSchema struct {
	Name   string      `json:"name"`
	Strict bool        `json:"strict"`
	Schema interface{} `json:"schema"`
}

// openRouterResponse is the response from OpenRouter.
type openRouterResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error,omitempty"`
}

// Analyze sends a market query to OpenRouter and returns structured analysis.
func (s *AIService) Analyze(query string) (*model.MarketAnalysis, error) {
	schema := map[string]interface{}{
		"type": "object",
		"properties": map[string]interface{}{
			"condition": map[string]interface{}{
				"type": "string",
				"enum": []string{"clear", "storm", "fog"},
			},
			"direction": map[string]interface{}{
				"type": "string",
				"enum": []string{"bullish", "bearish", "neutral"},
			},
			"riskLevel": map[string]interface{}{
				"type": "string",
				"enum": []string{"low", "medium", "high"},
			},
			"captainInsight": map[string]interface{}{
				"type": "string",
			},
			"signals": map[string]interface{}{
				"type": "array",
				"items": map[string]interface{}{
					"type": "object",
					"properties": map[string]interface{}{
						"icon":        map[string]interface{}{"type": "string"},
						"label":       map[string]interface{}{"type": "string"},
						"description": map[string]interface{}{"type": "string"},
					},
					"required":             []string{"icon", "label", "description"},
					"additionalProperties": false,
				},
			},
			"strategy": map[string]interface{}{
				"type":  "array",
				"items": map[string]interface{}{"type": "string"},
			},
			"summary": map[string]interface{}{
				"type": "string",
			},
			"confidence": map[string]interface{}{
				"type": "integer",
			},
		},
		"required":             []string{"condition", "direction", "riskLevel", "captainInsight", "signals", "strategy", "summary", "confidence"},
		"additionalProperties": false,
	}

	reqBody := openRouterRequest{
		Model: s.cfg.OpenRouterModel,
		Messages: []message{
			{Role: "system", Content: systemPrompt},
			{Role: "user", Content: fmt.Sprintf("Analyze the following market topic and provide your maritime intelligence briefing: %s", query)},
		},
		ResponseFormat: &responseFormat{
			Type: "json_schema",
			JSONSchema: &jsonSchema{
				Name:   "market_analysis",
				Strict: true,
				Schema: schema,
			},
		},
		Temperature: 0.7,
	}

	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequest("POST", "https://openrouter.ai/api/v1/chat/completions", bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.cfg.OpenRouterAPIKey)
	req.Header.Set("HTTP-Referer", "https://bahrion.vercel.app")
	req.Header.Set("X-Title", "BAHRION Maritime Intelligence")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to call OpenRouter: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("OpenRouter returned status %d: %s", resp.StatusCode, string(body))
	}

	var orResp openRouterResponse
	if err := json.Unmarshal(body, &orResp); err != nil {
		return nil, fmt.Errorf("failed to parse OpenRouter response: %w", err)
	}

	if orResp.Error != nil {
		return nil, fmt.Errorf("OpenRouter error: %s", orResp.Error.Message)
	}

	if len(orResp.Choices) == 0 {
		return nil, fmt.Errorf("no response from AI model")
	}

	content := orResp.Choices[0].Message.Content
	var analysis model.MarketAnalysis
	if err := json.Unmarshal([]byte(content), &analysis); err != nil {
		return nil, fmt.Errorf("failed to parse AI analysis: %w", err)
	}

	return &analysis, nil
}
