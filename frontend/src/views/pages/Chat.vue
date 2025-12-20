<template>
    <div class="flex flex-col gap-4">
        Input
        <InputWindow @send="handleMessage" @response="handleResponse" @loading="handleLoading" />
        
        <!-- Loading Spinner -->
        <div v-if="isLoading" class="flex items-center justify-center py-8">
            <div class="flex flex-col items-center gap-3">
                <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
                <p class="text-surface-600 dark:text-surface-400">Processing request...</p>
            </div>
        </div>
        
        Output
        <OutputWindow ref="outputWindowRef" />
    </div>

</template>

<script setup>
import { ref } from 'vue';
import InputWindow from '@/components/chat/InputWindow.vue';
import OutputWindow from '@/components/chat/OutputWindow.vue';

const outputWindowRef = ref(null);
const isLoading = ref(false);

const handleMessage = (message) => {
    console.log('Message sent:', message);
};

const handleLoading = (loading) => {
    isLoading.value = loading;
};

const handleResponse = (response) => {
    
    if (!outputWindowRef.value) return;
    
    try {
        // Parse the JSON response body to extract the message content
        if (response.ok && response.body) {
            const parsed = JSON.parse(response.body);
            // Ollama API returns { message: { content: "..." } }
            const content = parsed.message?.content || parsed.content || response.body;
            outputWindowRef.value.setMessage(content);
        } else {
            // Show error or raw body if not OK
            outputWindowRef.value.setMessage(response.body || `Error: ${response.statusText}`);
        }
    } catch (error) {
        // If parsing fails, show the raw body
        console.error('Failed to parse response:', error);
        outputWindowRef.value.setMessage(response.body || 'Failed to parse response');
    }
};

</script>
