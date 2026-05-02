package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/bahrion/backend/internal/model"
	"github.com/bahrion/backend/internal/service"
)

// Handler holds dependencies for HTTP handlers.
type Handler struct {
	ai *service.AIService
}

// NewHandler creates a new handler with the given AI service.
func NewHandler(ai *service.AIService) *Handler {
	return &Handler{ai: ai}
}

// Analyze handles POST /api/v1/analyze requests.
// It validates the incoming query, sends it to the AI service,
// and returns a structured market analysis response.
func (h *Handler) Analyze(c *gin.Context) {
	var req model.AnalyzeRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, model.AnalyzeResponse{
			Success: false,
			Error:   "Invalid request. Please provide a market query (3-200 characters).",
		})
		return
	}

	analysis, err := h.ai.Analyze(req.Query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, model.AnalyzeResponse{
			Success: false,
			Error:   "Captain is temporarily unable to analyze the waters. Please try again.",
		})
		// Log the actual error for debugging
		c.Error(err)
		return
	}

	c.JSON(http.StatusOK, model.AnalyzeResponse{
		Success: true,
		Data:    analysis,
	})
}
