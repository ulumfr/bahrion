package model

// AnalyzeRequest represents the incoming analysis request from the frontend.
type AnalyzeRequest struct {
	Query string `json:"query" binding:"required,min=3,max=200"`
}
