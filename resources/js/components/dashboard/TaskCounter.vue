<script setup lang="ts">
import type { TaskStatus } from '@/declarations';
import { computed } from 'vue';

const props = defineProps<{
    status: TaskStatus,
    count: number
}>();

const statusClass = computed(() => props.status.toLowerCase().replace(' ', '-'));
</script>

<template>
    <div class="task-counter" :class="statusClass">
        <h1 class="counter">{{ count.toLocaleString() }}</h1>
        <h4 class="status">{{ status }}</h4>
    </div>
</template>

<style lang="scss" scoped>
.task-counter {
    @apply border border-gray-500 border-t-4 border-solid w-full text-center rounded-md p-5;
    
    &.todo {
        @apply text-blue-500 border-blue-500;
        
        .status {
            @apply text-blue-500;
        }
    }

    &.in-progress {
        @apply text-orange-500 border-orange-500;
        
        .status {
            @apply text-orange-500;
        }
    }

    &.done {
        @apply text-green-500 border-green-500;
        
        .status {
            @apply text-green-500;
        }
    }

    .counter {
        @apply m-0 font-bold font-['courier'];
    }

    .status {
        @apply m-0 text-gray-600 font-['courier'];
    }
}
</style>
