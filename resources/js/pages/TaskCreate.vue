<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import TaskForm from '@/components/tasks/TaskForm.vue';
import type { Task } from '@/declarations';

const router = useRouter();

const { mutate, isPending } = useMutation({
    mutationFn: (formData: Task) => window.axios.post('/api/tasks', formData),
    onSuccess: handleSuccess,
    onError: () => toast('Failed to create a task. Please try again.', { type: 'error' }),
})

function handleSuccess() {
    toast('Successfully created a task.', { type: 'success' });
    const redirectTimeout = setTimeout(() => {
        router.push('/tasks');
        clearInterval(redirectTimeout);
    }, 1000);
}
</script>

<template>
        <TaskForm @submit="mutate" type="Create" :is-pending="isPending" />
</template>