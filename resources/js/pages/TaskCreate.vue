<script setup lang="ts">
import { createZodPlugin } from '@formkit/zod';
import { TaskSchema, TaskStatus, type Task } from '@/declarations';
import { useMutation } from '@tanstack/vue-query'
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const router = useRouter();

const { mutate, isPending } = useMutation({
    mutationFn: (formData: Task) => window.axios.post('/api/tasks', formData),
    onSuccess: handleSuccess,
    onError: () => toast('Failed to create a task. Please try again.', { type: 'error' }),
})

const [zodPlugin, submitHandler] = createZodPlugin(TaskSchema, (formData: Task) => {
    mutate(formData);
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
    <div class="content">
        <FormKit type="form" @submit="submitHandler" :plugins="[zodPlugin]" :actions="false">
            <FormKit
                type="text"
                name="title"
                label="Title"
            />
            <FormKit
                type="textarea"
                name="description"
                label="Description"
            />
            <FormKit
                type="radio"
                name="status"
                label="Status"
                :value="TaskStatus.todo"
                :options="Object.values(TaskStatus)"
            />
            <FormKit
                type="date"
                name="due_at"
                label="Due Date"
            />
            <div class="form-action-container">
                <button type="button">Discard</button>
                <FormKit
                    type="submit"
                    label="Create"
                    :disabled="isPending"
                />
            </div>
        </FormKit>
    </div>
</template>

<style scoped lang="scss">
.content {
    @apply flex justify-center items-center;

    .formkit-form {
        @apply max-w-md w-full
    }

    :deep(.formkit-input:not([type=radio])) {
        @apply w-full;
    }

    .form-action-container {
        @apply flex gap-5;

        button, .formkit-outer {
            @apply w-1/2;
        }
    }
}
</style>