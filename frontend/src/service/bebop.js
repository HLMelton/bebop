// Bebop service that uses the Go backend to proxy requests to Ollama
// This avoids CORS issues by routing requests through the Wails backend

import { SendBebopMessage } from '../../wailsjs/go/main/App';

/**
 * Send a message via the Go backend, which proxies the request to Ollama.
 * This avoids CORS issues since the request is made from the Go backend.
 *
 * @param {string} message - Raw text from the InputWindow textarea.
 * @param {Object} [options] - Reserved for future use (currently unused)
 * @returns {Promise<{ ok: boolean, status: number, statusText: string, body: string }>}
 */
export async function sendBebopMessage(message, options = {}) {
    try {
        // Call the Go backend method via Wails runtime
        const result = await SendBebopMessage(message);
        
        // The Go method returns a BebopResponse object
        return {
            ok: result.ok,
            status: result.status,
            statusText: result.statusText,
            body: result.body
        };
    } catch (error) {
        // If the Go method throws an error, wrap it in a response-like object
        throw new Error(`Failed to send bebop message: ${error.message}`);
    }
}



