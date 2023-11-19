<script setup lang="ts">
import SubNavbar from '@/components/SubNavbar.vue';
import WelcomeUser from '@/components/dashboard/WelcomeUser.vue';
import TaskCounter from '@/components/dashboard/TaskCounter.vue';
import TaskCounterSkeleton from '@/components/dashboard/TaskCounterSkeleton.vue';
import { TaskStatus } from '@/declarations';
import { useTaskApi } from '@/hooks/task-api';

const taskApi = useTaskApi();
const dueTodayResponse = taskApi.fetchTasks(undefined, 'today');
const duePastResponse = taskApi.fetchTasks(undefined, 'past');
const todoResponse = taskApi.fetchTasks(TaskStatus.todo);
const inprogressResponse = taskApi.fetchTasks(TaskStatus.in_progress);
const doneResponse = taskApi.fetchTasks(TaskStatus.done);
</script>

<template>
    <SubNavbar />
    <Suspense>
        <WelcomeUser />
    </Suspense>
    <div class="task-counters">
        <Suspense>
            <TaskCounter status="Due Today" :api-request="dueTodayResponse" />
            <template #fallback>
                <TaskCounterSkeleton />
            </template>
        </Suspense>
        <Suspense>
            <TaskCounter status="Past Due" :api-request="duePastResponse" />
            <template #fallback>
                <TaskCounterSkeleton />
            </template>
        </Suspense>
    </div>
    <div class="task-counters">
        <Suspense>
            <TaskCounter :status="TaskStatus.todo" :api-request="todoResponse" />
            <template #fallback>
                <TaskCounterSkeleton />
            </template>
        </Suspense>
        <Suspense>
            <TaskCounter :status="TaskStatus.in_progress" :api-request="inprogressResponse" />
            <template #fallback>
                <TaskCounterSkeleton />
            </template>
        </Suspense>
        <Suspense>
            <TaskCounter :status="TaskStatus.done" :api-request="doneResponse" />
            <template #fallback>
                <TaskCounterSkeleton />
            </template>
        </Suspense>
    </div>
</template>

<style scoped lang="scss">
.task-counters {
    @apply flex flex-col gap-5 w-full mt-5;

    @apply md:flex-row;
}
</style>
