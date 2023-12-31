<script setup lang="ts">
import SubNavbar from '@/components/SubNavbar.vue';
import Tip from '@/components/Tip.vue';
import TaskColumn from '@/components/tasks/TaskColumn.vue';
import { TaskStatus, type Task } from '@/declarations';
import { useTasksStore } from '@/stores/tasks';
import { watchEffect } from 'vue';
import { ref } from 'vue';
import { useTaskApi } from '@/hooks/task-api';
import SortTip from '@/components/tasks/SortTip.vue';
import Search from '@/components/tasks/Search.vue';
import DragTip from '@/components/tasks/DragTip.vue';

const tasksStore = useTasksStore();
const task = ref<Task | undefined>();
const status = ref<TaskStatus | undefined>();
const taskApi = useTaskApi();

const handleChange = (log) => {
    if (log?.added) {
        task.value = {
            ...log.added?.element, 
            sort: log?.added?.newIndex || 0
        };
    } else if (log?.moved) {
        task.value = {
            ...log.moved?.element, 
            sort: log?.moved?.newIndex || 0
        };
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
    task.value = undefined;
    status.value = undefined;
});
</script>

<template>
    <SubNavbar>
        <Search />
    </SubNavbar>
    <div class="content">
        <TaskColumn 
            :tasks="tasksStore?.todos" 
            :is-pending="tasksStore.pendingTodos"
            :label="TaskStatus.todo" 
            @change="handleChange" 
            @drop="handleDrop"
        />
        <TaskColumn 
            :tasks="tasksStore?.inprogress" 
            :is-pending="tasksStore.pendingInprogress"
            :label="TaskStatus.in_progress" 
            @change="handleChange" 
            @drop="handleDrop"
        />
        <TaskColumn 
            :tasks="tasksStore?.done" 
            :is-pending="tasksStore.pendingDone"
            :label="TaskStatus.done" 
            @change="handleChange" 
            @drop="handleDrop"
        />
        <Tip label="TIP" class="tip">
            <SortTip />
            <hr class="my-2" />
            <DragTip />
        </Tip>
    </div>
</template>

<style scoped lang="scss">
.content {
    @apply w-full flex flex-col h-full mt-2 relative;

    @apply md:flex-row;

    .tip {
        @apply top-[-78px] md:top-[-35px];
    }
}
</style>
