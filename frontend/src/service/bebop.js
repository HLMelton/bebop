// Basic bebop service for sending chat messages over POST
// The body is formatted as JSON for the Ollama-style /api/chat endpoint.

// TODO: Adjust this to your actual local endpoint
const DEFAULT_BEBOP_URL = 'http://192.168.119.157:11434/api/chat';

/**
 * Send a message as the raw body of a POST request.
 *
 * @param {string} message - Raw text from the InputWindow textarea.
 * @param {Object} [options]
 * @param {string} [options.url] - Override default endpoint.
 * @param {Object} [options.headers] - Extra headers to merge with defaults.
 * @returns {Promise<{ ok: boolean, status: number, statusText: string, body: string }>}
 */
export async function sendBebopMessage(message, options = {}) {
    const url = options.url || DEFAULT_BEBOP_URL;

    const baseHeaders = {
        'Content-Type': 'application/json'
    };

    const headers = {
        ...baseHeaders,
        ...(options.headers || {})
    };

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model: 'bebop',
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ],
            stream: false
        })
    });

    const bodyText = await response.text().catch(() => '');

    return {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        body: bodyText
    };
}
export { DEFAULT_BEBOP_URL };



