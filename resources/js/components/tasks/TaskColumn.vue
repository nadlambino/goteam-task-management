<script setup lang="ts">
import { TaskStatus, type Task as TaskType } from '@/declarations';
import Task from '@/components/tasks/Task.vue';
import draggable from 'vuedraggable';

const emits = defineEmits(['change', 'drop'])
const props = defineProps<{
    label: TaskStatus,
    tasks: TaskType[]
}>();

const handleChange = (log) => {
    emits('change', log)
}

const handleEnd = (log) => {
    emits('drop', props.label)
}

</script>

<template>
    <div class="task-column">
        <h4 class="label">{{ label }}</h4>
        <draggable 
            class="tasks-container" 
            :list="tasks" 
            group="tasks"
            @change="handleChange" 
            @drop="handleEnd"
            :item-key="label">
            <template #item="{ element: task } : { element: TaskType }">
                <Task :task="task" :key="task.id" />
            </template>
        </draggable>
    </div>
</template>

<style scoped lang="scss">
.task-column {
    @apply w-full;

    @apply md:w-1/3;

    .label {
        @apply uppercase text-sm text-center bg-blue-500 py-1 text-white shadow-lg;
    }

    .tasks-container {
        @apply flex flex-col gap-3 h-[calc(100vh-190px)] overflow-y-scroll p-2;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>