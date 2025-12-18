<template>
    <div class="card mb-0">
        <div class="flex gap-3 items-end">
            <div class="flex-1">
                <textarea
                    v-model="message"
                    class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-0 dark:bg-surface-900 text-surface-900 dark:text-surface-0 resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Output will appear here..."
                    rows="3"
                    ref="textareaRef"
                    readonly
                ></textarea>
            </div>
            <button
                @click="handleCopy"
                :disabled="!message.trim()"
                class="flex items-center justify-center bg-primary text-primary-contrast rounded-lg px-4 py-3 hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style="min-width: 3rem; height: fit-content;"
                :title="copied ? 'Copied!' : 'Copy to clipboard'"
            >
                <i :class="copied ? 'pi pi-check !text-lg' : 'pi pi-copy !text-lg'"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
const textareaRef = ref(null);
const copied = ref(false);

const handleCopy = async () => {
    if (message.value.trim()) {
        try {
            await navigator.clipboard.writeText(message.value);
            copied.value = true;
            setTimeout(() => {
                copied.value = false;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
            // Fallback for older browsers
            if (textareaRef.value) {
                textareaRef.value.select();
                document.execCommand('copy');
                copied.value = true;
                setTimeout(() => {
                    copied.value = false;
                }, 2000);
            }
        }
    }
};

defineExpose({
    setMessage: (text) => {
        message.value = text;
    },
    getMessage: () => message.value
});
</script>