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
        <n-popover :width="300" trigger="hover">
            <template #trigger>
                <span class="tip-icon-wrapper">
                    <BulbIcon class="bulb-icon" />
                    <span v-if="label">{{ label }}</span>
                </span>
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
    @apply absolute top-0;

    .tip-icon-wrapper {
        @apply bg-transparent border-none flex justify-center items-center cursor-pointer
        gap-1 uppercase text-[10px] font-bold text-yellow-500 hover:text-yellow-400;

        span {
            @apply text-gray-400 font-semibold;
        }
    }

    .bulb-icon {
        @apply w-5 h-5 relative top-[-2px];
    }
}
</style>
