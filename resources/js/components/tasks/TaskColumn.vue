<script setup lang="ts">
import draggable from 'vuedraggable';
import TaskComponent from '@/components/tasks/Task.vue';
import TaskSkeleton from '@/components/tasks/TaskSkeleton.vue';
import TaskEmpty from '@/components/tasks/TaskEmpty.vue';
import { TaskStatus, type Task } from '@/declarations';

const emits = defineEmits(['change', 'drop']);
const props = defineProps<{
    label: TaskStatus,
    tasks: Task[] | undefined,
    isPending: boolean
}>();

const handleChange = (log) => {
    emits('change', log);
}

const handleEnd = () => {
    emits('drop', props.label);
}

</script>

<template>
    <div class="task-column">
        <h4 class="label">{{ label }}</h4>
        <div v-if="!isPending && tasks?.length === 0" class="tasks-container-empty">
            <TaskEmpty />
        </div>
        <div v-if="isPending" class="tasks-container">
            <TaskSkeleton />
        </div>
        <draggable 
            v-else
            class="tasks-container" 
            :list="tasks" 
            group="tasks"
            @change="handleChange" 
            @drop="handleEnd"
            :item-key="label">
            <template #item="{ element: task } : { element: Task }">
                <TaskComponent :task="task" :key="task.id" />
            </template>
        </draggable>
    </div>
</template>

<style scoped lang="scss">
.task-column {
    @apply w-full relative;

    @apply md:w-1/3;

    .label {
        @apply uppercase text-sm text-center bg-blue-500 py-1 text-white shadow-lg;
    }

    .tasks-container-empty {
        @apply flex flex-col gap-3 h-auto overflow-hidden p-2 w-full relative md:absolute;
    }

    .tasks-container {
        @apply flex flex-col gap-3 h-auto overflow-y-scroll p-2;

        @apply md:h-[calc(100vh-190px)];

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
