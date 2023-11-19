<script setup lang="ts">
import SubNavbar from '@/components/SubNavbar.vue';
import WelcomeUser from '@/components/dashboard/WelcomeUser.vue';
import TaskCounter from '@/components/dashboard/TaskCounter.vue';
import { TaskStatus } from '@/declarations';
import { useTasks } from '@/stores/tasks';

const tasks = useTasks();
</script>

<template>
    <SubNavbar />
    <Suspense>
        <WelcomeUser />
    </Suspense>
    <div class="task-counters">
        <TaskCounter :status="TaskStatus.todo" :count="tasks.todos?.length || 0" />
        <TaskCounter :status="TaskStatus.in_progress" :count="tasks.inprogress?.length || 0" />
    </div>
    <div class="task-counters">
        <TaskCounter :status="TaskStatus.todo" :count="tasks.todos?.length || 0" />
        <TaskCounter :status="TaskStatus.in_progress" :count="tasks.inprogress?.length || 0" />
        <TaskCounter :status="TaskStatus.done" :count="tasks.done?.length || 0" />
    </div>
</template>

<style scoped lang="scss">
.task-counters {
    @apply flex flex-col gap-5 w-full mt-5;

    @apply md:flex-row;
}
</style>
