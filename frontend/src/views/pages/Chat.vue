<template>
    <div class="flex flex-col gap-4">
        Input
        <InputWindow @send="handleMessage" />
        Output
        <OutputWindow />
    </div>

</template>

<script setup>
import InputWindow from '@/components/chat/InputWindow.vue';
import OutputWindow from '@/components/chat/OutputWindow.vue';

const handleMessage = (message) => {
    console.log('Message sent:', message);
    // TODO: Implement message sending logic
};

</script>
