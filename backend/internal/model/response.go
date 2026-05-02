package model

// MarketSignal represents an individual market signal indicator.
type MarketSignal struct {
	Icon        string `json:"icon"`
	Label       string `json:"label"`
	Description string `json:"description"`
}

// MarketAnalysis is the structured AI analysis output.
type MarketAnalysis struct {
	Condition      string         `json:"condition"`      // clear | storm | fog
	Direction      string         `json:"direction"`      // bullish | bearish | neutral
	RiskLevel      string         `json:"riskLevel"`      // low | medium | high
	CaptainInsight string         `json:"captainInsight"`
	Signals        []MarketSignal `json:"signals"`
	Strategy       []string       `json:"strategy"`
	Summary        string         `json:"summary"`
	Confidence     int            `json:"confidence"` // 0-100
}

// AnalyzeResponse is the API response wrapper.
type AnalyzeResponse struct {
	Success bool            `json:"success"`
	Data    *MarketAnalysis `json:"data,omitempty"`
	Error   string          `json:"error,omitempty"`
}
