<script setup>
import { useLayout } from '@/layout/composables/layout';
import { $t, updatePreset, updateSurfacePalette } from '@primeuix/themes';
import { ref } from 'vue';

const { layoutConfig, isDarkTheme } = useLayout();

const menuMode = ref(layoutConfig.menuMode);
const menuModeOptions = ref([
    { label: 'Static', value: 'static' },
    { label: 'Overlay', value: 'overlay' }
]);

const ipAddress = ref(layoutConfig.ipAddress || '192.168.119.157');

function onMenuModeChange() {
    layoutConfig.menuMode = menuMode.value;
}

function onIpAddressChange() {
    layoutConfig.ipAddress = ipAddress.value;
    // TODO: Link with bebop.js service to update IP address in Go backend
}
</script>

<template>
    <div
        class="config-panel hidden absolute top-[3.25rem] right-0 w-64 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]"
    >
        <div class="flex flex-col gap-4">
            <div>Host Address:</div>
            <div class="flex flex-col gap-2">
                <InputText 
                    v-model="ipAddress" 
                    @blur="onIpAddressChange"
                    @keydown.enter="onIpAddressChange"
                    placeholder="localhost:11434"
                    type="text"
                />
            </div>

        </div>
    </div>
</template>
