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
const moreTaskCount = ref(0);

await apiRequest.value.then(response => {
    count.value = response.data.length;
    tasks.value = response.data.slice(0, 3);
    moreTaskCount.value = response.data.length - 3;
});
</script>

<template>
    <div class="task-counter" :class="statusClass">
        <h1 class="counter">{{ count.toLocaleString() }}</h1>
        <h4 class="status">{{ status }}</h4>

        <ul class="tasks">
            <li
                v-for="task in tasks" 
                :key="task.id">
                <router-link 
                    :to="`/tasks/${task.id}`">
                    {{ task.title }}
                </router-link>
            </li>
        </ul>
        <router-link 
            v-if="moreTaskCount > 0" 
            to="/tasks">
            and {{ moreTaskCount }}+ other task(s)
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.task-counter {
    @apply border border-gray-500 border-t-4 border-solid w-full rounded-md p-5;
    
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
        @apply m-0 font-bold text-center;
    }

    .status {
        @apply m-0 text-gray-600 text-center;
    }

    .tasks {
        @apply mt-5 mb-2 list-outside;
    }
}
</style>
