package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"

	"github.com/bahrion/backend/internal/config"
	"github.com/bahrion/backend/internal/handler"
	"github.com/bahrion/backend/internal/service"
)

func main() {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading it, using system environment variables")
	}

	// Load configuration
	cfg := config.Load()

	if cfg.OpenRouterAPIKey == "" {
		log.Println("WARNING: OPENROUTER_API_KEY is not set. AI analysis will fail.")
	}

	// Initialize services
	aiService := service.NewAIService(cfg)
	h := handler.NewHandler(aiService)

	// Setup Gin router
	r := gin.Default()

	// CORS configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     cfg.AllowedOrigins,
		AllowMethods:     []string{"POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "service": "bahrion-api"})
	})

	// API routes
	api := r.Group("/api/v1")
	{
		api.POST("/analyze", h.Analyze)
	}

	// Start server
	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("⚓ BAHRION API starting on %s", addr)
	log.Printf("📡 Model: %s", cfg.OpenRouterModel)
	if err := r.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
