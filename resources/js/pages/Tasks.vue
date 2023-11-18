<script setup lang="ts">
import SubNavbar from '@/components/SubNavbar.vue';
import TaskColumn from '@/components/tasks/TaskColumn.vue';
import { TaskStatus } from '@/declarations';
import { useTasks } from '@/stores/tasks';

const tasks = useTasks();
</script>

<template>
    <SubNavbar />
    <div class="content">
        <TaskColumn :tasks="tasks.todos" :getter="tasks.getNextTodos" :label="TaskStatus.todo" />
        <TaskColumn :tasks="tasks.inprogress" :getter="tasks.getNextInprogress" :label="TaskStatus.in_progress" />
        <TaskColumn :tasks="tasks.done" :getter="tasks.getNextDone" :label="TaskStatus.done" />
    </div>
</template>

<style scoped lang="scss">
.content {
    @apply w-full flex flex-col h-full mt-2;

    @apply md:flex-row;
}
</style>