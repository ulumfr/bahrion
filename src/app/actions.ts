"use server";

import { AnalysisResult, MarketAnalysis } from "@/lib/types";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

const SYSTEM_PROMPT = `You are Captain Bahrion, an elite AI maritime intelligence officer specializing in financial market navigation. Your role is to analyze market conditions and deliver structured intelligence briefings.

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
- Each signal should have a relevant emoji icon`;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    condition: { type: "string", enum: ["clear", "storm", "fog"] },
    direction: { type: "string", enum: ["bullish", "bearish", "neutral"] },
    riskLevel: { type: "string", enum: ["low", "medium", "high"] },
    captainInsight: { type: "string" },
    signals: {
      type: "array",
      items: {
        type: "object",
        properties: {
          icon: { type: "string" },
          label: { type: "string" },
          description: { type: "string" },
        },
        required: ["icon", "label", "description"],
        additionalProperties: false,
      },
    },
    strategy: {
      type: "array",
      items: { type: "string" },
    },
    summary: { type: "string" },
    confidence: { type: "integer" },
  },
  required: [
    "condition",
    "direction",
    "riskLevel",
    "captainInsight",
    "signals",
    "strategy",
    "summary",
    "confidence",
  ],
  additionalProperties: false,
};

/**
 * Server Action: Analyze a market topic directly via OpenRouter
 * Runs purely on the server, safely hiding the API Key.
 */
export async function analyzeMarket(
  _prevState: AnalysisResult | null,
  formData: FormData
): Promise<AnalysisResult> {
  const query = formData.get("query") as string;

  if (!query || query.trim().length < 3) {
    return { success: false, error: "Please enter a market topic (at least 3 characters)." };
  }

  if (query.trim().length > 200) {
    return { success: false, error: "Query is too long. Please keep it under 200 characters." };
  }

  if (!OPENROUTER_API_KEY) {
    return { success: false, error: "System error: Captain's comms link (API Key) is missing." };
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://bahrion.vercel.app",
        "X-Title": "BAHRION Maritime Intelligence",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Analyze the following market topic and provide your maritime intelligence briefing: ${query.trim()}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "market_analysis",
            strict: true,
            schema: RESPONSE_SCHEMA,
          },
        },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter Error:", err);
      return {
        success: false,
        error: "Captain is temporarily unable to navigate these waters. Please try again.",
      };
    }

    const result = await response.json();
    if (!result.choices || result.choices.length === 0) {
      return { success: false, error: "Received an empty transmission from the Captain." };
    }

    const content = result.choices[0].message.content;
    const data: MarketAnalysis = JSON.parse(content);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return {
      success: false,
      error: "Unable to reach the navigation server. Please check your connection and try again.",
    };
  }
}
