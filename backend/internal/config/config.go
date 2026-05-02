package config

import "os"

// Config holds application configuration from environment variables.
type Config struct {
	Port             string
	OpenRouterAPIKey string
	OpenRouterModel  string
	AllowedOrigins   []string
}

// Load reads configuration from environment variables with sensible defaults.
func Load() *Config {
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}

	model := os.Getenv("OPENROUTER_MODEL")
	if model == "" {
		model = "openai/gpt-4o-mini"
	}

	origins := os.Getenv("ALLOWED_ORIGINS")
	allowedOrigins := []string{"http://localhost:3000"}
	if origins != "" {
		allowedOrigins = append(allowedOrigins, origins)
	}

	return &Config{
		Port:             port,
		OpenRouterAPIKey: os.Getenv("OPENROUTER_API_KEY"),
		OpenRouterModel:  model,
		AllowedOrigins:   allowedOrigins,
	}
}
