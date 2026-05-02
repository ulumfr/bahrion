package api

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/bahrion/backend/internal/config"
	"github.com/bahrion/backend/internal/handler"
	"github.com/bahrion/backend/internal/service"
)

var (
	app  *gin.Engine
	once sync.Once
)

// Handler is the entrypoint for Vercel serverless function
func Handler(w http.ResponseWriter, r *http.Request) {
	// Ensure initialization only happens once per cold start
	once.Do(initApp)
	// Serve the HTTP request through Gin
	app.ServeHTTP(w, r)
}

func initApp() {
	// Set Gin to release mode for production
	gin.SetMode(gin.ReleaseMode)

	// Load configuration
	cfg := config.Load()

	if cfg.OpenRouterAPIKey == "" {
		log.Println("WARNING: OPENROUTER_API_KEY is not set. AI analysis will fail.")
	}

	// Initialize services
	aiService := service.NewAIService(cfg)
	h := handler.NewHandler(aiService)

	// Initialize Gin app
	app = gin.Default()

	// CORS configuration
	app.Use(cors.New(cors.Config{
		AllowOrigins:     cfg.AllowedOrigins, // Make sure Vercel frontend domain is added here via Vercel dashboard env vars later
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	// Health check
	app.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "service": "bahrion-api", "deployment": "vercel"})
	})

	// API routes
	api := app.Group("/api/v1")
	{
		api.POST("/analyze", h.Analyze)
	}
}
