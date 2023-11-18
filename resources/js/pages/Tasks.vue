<script setup lang="ts">
import SubNavbar from '@/components/SubNavbar.vue';
import TaskColumn from '@/components/tasks/TaskColumn.vue';
import { TaskStatus, type Task } from '@/declarations';
import { useTasks } from '@/stores/tasks';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

const tasks = useTasks();
const task = ref<Task | undefined>();
const status = ref<TaskStatus | undefined>();

const handleChange = (log) => {
    if (log?.added) {
        task.value = log.added?.element
    } else if (log?.moved) {
        task.value = log.moved?.element
    }
}

const handleDrop = (newStatus) => {
    status.value = newStatus;
}

const queryClient = useQueryClient();
const { mutate } = useMutation({
    mutationFn: (formData: Task) => window.axios.put(`/api/tasks/${formData.id}`, formData),
    onSuccess: handleSuccess,
    onError: () => toast('Failed to update a task. Please try again.', { type: 'error' }),
});

function handleSuccess() {
    toast('Successfully updated a task.', { type: 'success' });
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
    task.value = undefined;
    status.value = undefined;
}

watchEffect(() => {
    if (!task.value || !status.value) return;

    const formData = {...task.value};
    formData.status = status.value;
    mutate(formData);
})
</script>

<template>
    <SubNavbar />
    <div class="content">
        <TaskColumn 
            :tasks="(tasks.todos as Task[])" 
            :label="TaskStatus.todo" 
            @change="handleChange" 
            @drop="handleDrop"
        />
        <TaskColumn 
            :tasks="(tasks.inprogress as Task[])" 
            :label="TaskStatus.in_progress" 
            @change="handleChange" 
            @drop="handleDrop"
        />
        <TaskColumn 
            :tasks="(tasks.done as Task[])" 
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