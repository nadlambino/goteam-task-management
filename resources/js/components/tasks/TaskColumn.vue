<script setup lang="ts">
import { TaskStatus, type Task } from '@/declarations';

const props = defineProps<{
    label: TaskStatus,
    tasks: Task[],
    getter: () => void
}>();

</script>

<template>
    <div class="task-column">
        <h3>{{ label }}</h3>
        <div class="tasks-container">
            <p v-for="task in tasks">{{ task.status }}</p>
            <button @click="getter">Get Next Page</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-column {
    @apply w-full;

    @apply md:w-1/3;
}
</style>