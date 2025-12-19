package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// BebopResponse represents the response from the bebop service
type BebopResponse struct {
	OK         bool   `json:"ok"`
	Status     int    `json:"status"`
	StatusText string `json:"statusText"`
	Body       string `json:"body"`
}

// SendBebopMessage sends a message to the Ollama API endpoint via the Go backend
// This avoids CORS issues by proxying the request through the Go backend
func (a *App) SendBebopMessage(message string) (*BebopResponse, error) {
	// Default Ollama endpoint - adjust this to your actual endpoint
	const defaultURL = "http://192.168.119.157:11434/api/chat"

	// Prepare the request body
	requestBody := map[string]interface{}{
		"model": "bebop",
		"messages": []map[string]string{
			{
				"role":    "user",
				"content": message,
			},
		},
		"stream": false,
	}

	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	// Create HTTP request
	req, err := http.NewRequest("POST", defaultURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	// Execute the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	// Read response body
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	// Return the response
	return &BebopResponse{
		OK:         resp.StatusCode >= 200 && resp.StatusCode < 300,
		Status:     resp.StatusCode,
		StatusText: resp.Status,
		Body:       string(bodyBytes),
	}, nil
}

