<script setup lang="ts">
import BulbIcon from '@/components/icons/BulbIcon.vue';
import { NPopover } from 'naive-ui';
import { useSlots } from 'vue';

defineProps<{
    label?: String,
    content?: String
}>();

const slots = useSlots();
const hasSlot = !!slots?.default;
</script>

<template>
    <div class="tip-container">
        <n-popover :width="300" trigger="click">
            <template #trigger>
                <button class="tip-btn">
                    <BulbIcon class="bulb-icon" />
                    <span v-if="label">{{ label }}</span>
                </button>
            </template>
            <div v-if="!hasSlot" class="large-text">
                {{ content }}
            </div>
            <slot></slot>
        </n-popover>
    </div>
</template>

<style scoped lang="scss">
.tip-container {
    @apply absolute top-[-35px];

    .tip-btn {
        @apply bg-transparent border-none flex justify-center items-center
        gap-1 uppercase text-gray-500 text-[10px] font-bold;
    }

    .bulb-icon {
        @apply text-yellow-400 w-5 h-5 relative top-[-2px];
    }
}
</style>
