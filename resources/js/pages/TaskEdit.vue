<script setup lang="ts">
import TaskForm from '@/components/tasks/TaskForm.vue';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import type { Task } from '@/declarations';
import { useTaskApi } from '@/hooks/task-api';

const router = useRouter();
const props = defineProps<{ id: number }>();

const task = ref<Task | undefined>();
const taskApi = useTaskApi();

onBeforeMount(async () => {
    const apiResponse = await taskApi.fetchTaskById(props.id).catch(() => {
        router.push('/tasks');
        return;
    });

    if (!apiResponse?.data) {
        return router.push('/tasks');
    }

    task.value = apiResponse?.data;
});
</script>

<template>
    <TaskForm 
        @submit="taskApi.updateTask" 
        type="Update" 
        :is-pending="taskApi.isUpdating.value" 
        :task="task" 
    />
</template>
