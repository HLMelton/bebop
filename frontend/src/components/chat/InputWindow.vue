<template>
    <div class="card mb-0">
        <div class="flex gap-3 items-end">
            <div class="flex-1">
                <textarea
                    v-model="message"
                    @keydown.enter.exact.prevent="handleSend"
                    @keydown.enter.shift.exact="message += '\n'"
                    class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Type your message..."
                    rows="3"
                    ref="textareaRef"
                ></textarea>
            </div>
            <button
                @click="handleSend"
                :disabled="!message.trim()"
                class="flex items-center justify-center bg-primary text-primary-contrast rounded-lg px-4 py-3 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style="min-width: 3rem; height: fit-content;"
            >
                <i class="pi pi-send !text-lg"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { sendBebopMessage } from '@/service/bebop';

const message = ref('');
const textareaRef = ref(null);

const emit = defineEmits(['send']);

const handleSend = async () => {
    const text = message.value.trim();
    if (!text) return;

    try {
        // Call the bebop service with the raw textbox content
        const result = await sendBebopMessage(text);
        console.log('bebop response:', result);

        // Still emit the message so parent components can react if needed
        emit('send', text);
    } catch (error) {
        console.error('Failed to send bebop message:', error);
    } finally {
        message.value = '';
        if (textareaRef.value) {
            textareaRef.value.focus();
        }
    }
};
</script>