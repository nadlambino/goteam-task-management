<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import TaskForm from '@/components/tasks/TaskForm.vue';
import type { Task } from '@/declarations';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import { useTaskApi } from '@/hooks/useTaskApi';

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
})

const queryClient = useQueryClient();
const { mutate, isPending } = useMutation({
    mutationFn: (formData: Task) => window.axios.put(`/api/tasks/${props.id}`, formData),
    onSuccess: handleSuccess,
    onError: () => toast('Failed to update a task. Please try again.', { type: 'error' }),
});

function handleSuccess() {
    toast('Successfully updated a task.', { type: 'success' });
    const redirectTimeout = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        router.push('/tasks');
        clearInterval(redirectTimeout);
    }, 1000);
}
</script>

<template>
        <TaskForm @submit="mutate" type="Update" :is-pending="isPending" :task="task" />
</template>