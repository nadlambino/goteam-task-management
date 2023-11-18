<script setup lang="ts">
import { TaskStatus, type Task as TaskType } from '@/declarations';
import Task from '@/components/tasks/Task.vue';

const props = defineProps<{
    label: TaskStatus,
    tasks: TaskType[],
    getter: () => void
}>();

</script>

<template>
    <div class="task-column">
        <h4 class="label">{{ label }}</h4>
        <div class="tasks-container">
            <Task v-for="task in tasks" :key="task.id" :task="task" />
            <button @click="getter">Get Next Page</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-column {
    @apply w-full;

    @apply md:w-1/3;

    .label {
        @apply uppercase text-sm text-center bg-blue-500 text-white tracking-widest;
    }

    .tasks-container {
        @apply flex flex-col gap-3 h-[calc(100vh-180px)] overflow-y-scroll p-2;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>