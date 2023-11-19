<script setup lang="ts">
import type { TaskStatus, Task, ApiSuccessResponse } from '@/declarations';
import { ref } from 'vue';
import { toRefs } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
    status: TaskStatus | 'Due Today' | 'Past Due',
    apiRequest: Promise<ApiSuccessResponse<Task[]>>
}>();

const { apiRequest } = toRefs(props);
const statusClass = computed(() => props.status.toLowerCase().replace(' ', '-'));
const count = ref(0);
const tasks = ref<Task[]>([]);

await apiRequest.value.then(r => {
    count.value = r.data.length;
    tasks.value = r.data;
})
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
        @apply text-yellow-500 border-yellow-500;
        
        .status {
            @apply text-yellow-500;
        }
    }

    &.done {
        @apply text-green-500 border-green-500;
        
        .status {
            @apply text-green-500;
        }
    }

    &.due-today {
        @apply text-orange-500 border-orange-500;
        
        .status {
            @apply text-orange-500;
        }
    }

    &.past-due {
        @apply text-red-600 border-red-600;
        
        .status {
            @apply text-red-600;
        }
    }

    .counter {
        @apply m-0 font-bold;
    }

    .status {
        @apply m-0 text-gray-600;
    }
}
</style>
