<script setup lang="ts">
import TaskForm from '@/components/tasks/TaskForm.vue';
import { useTaskApi } from '@/hooks/task-api';

const taskApi = useTaskApi();
</script>

<template>
    <TaskForm 
        @submit="taskApi.createTask" 
        type="Create" 
        :is-pending="taskApi.isCreating.value" 
    />
</template>
