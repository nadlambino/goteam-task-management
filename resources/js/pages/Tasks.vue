<script setup lang="ts">
import SubNavbar from '@/components/SubNavbar.vue';
import TaskColumn from '@/components/tasks/TaskColumn.vue';
import { TaskStatus, type Task } from '@/declarations';
import { useTasks } from '@/stores/tasks';
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { useTaskApi } from '@/hooks/useTaskApi';

const tasks = useTasks();
const task = ref<Task | undefined>();
const status = ref<TaskStatus | undefined>();
const taskApi = useTaskApi();

const handleChange = (log) => {
    if (log?.added) {
        const t = {...log.added?.element, sort: log?.added?.newIndex || 0}
        task.value = t
    } else if (log?.moved) {
        const t = {...log.moved?.element, sort: log?.moved?.newIndex || 0}
        task.value = t
    }
}

const handleDrop = (newStatus) => {
    status.value = newStatus;
}

watchEffect(() => {
    if (!task.value || !status.value) return;

    const formData = {...task.value};
    formData.status = status.value;
    taskApi.updateTask(formData);
})
</script>

<template>
    <SubNavbar />
    <div class="content">
        <TaskColumn 
            :tasks="(tasks?.todos || [] as Task[])" 
            :label="TaskStatus.todo" 
            @change="handleChange" 
            @drop="handleDrop"
        />
        <TaskColumn 
            :tasks="(tasks?.inprogress || [] as Task[])" 
            :label="TaskStatus.in_progress" 
            @change="handleChange" 
            @drop="handleDrop"
        />
        <TaskColumn 
            :tasks="(tasks?.done || [] as Task[])" 
            :label="TaskStatus.done" 
            @change="handleChange" 
            @drop="handleDrop"
        />
    </div>
</template>

<style scoped lang="scss">
.content {
    @apply w-full flex flex-col h-full mt-2;

    @apply md:flex-row;
}
</style>