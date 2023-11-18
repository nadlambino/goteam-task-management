<script setup lang="ts">
import type { Task } from '@/declarations';
import { computed } from 'vue';
import moment from 'moment';
import { useTaskApi } from '@/hooks/task-api';
import { NPopconfirm } from 'naive-ui'

const props = defineProps<{
    task: Task
}>();

const taskApi = useTaskApi();

const statusClass = computed(() => props.task.status.toLowerCase().replace(' ', '-'));
const createdAt = computed(() => moment(props.task.created_at).format('MMM DD YYYY'));
const startedAt = computed(() => props.task.started_at ? moment(props.task.started_at).format('MMM DD YYYY') : '-');
const dueAt = computed(() => props.task.due_at ? moment(props.task.due_at).format('MMM DD YYYY') : '-');

const handleDelete = () => {
    taskApi.deleteTask(props.task.id as number);
}
</script>

<template>
    <div class="task-container" :class="statusClass">
        <div class="title-container">
            <h4 class="title" :title="task.title">
                <router-link :to="`/tasks/${task.id}`">
                    {{ task.title }}
                </router-link>
            </h4>
            <n-popconfirm
                @positive-click="handleDelete"
                :width="300"
            >
                <template #trigger>
                    <button class="delete-btn">&times;</button>
                </template>
                <p class="overflow-hidden m-0">
                    Are you sure you want to delete <span class="delete-title">{{ task.title }}</span>?
                </p>
            </n-popconfirm>
        </div>
        <div class="body">
            <p class="desc">{{ task.description }}</p>
            <div class="details">
                <div class="details-row">
                    <small>Created</small>
                    <small>{{ createdAt }}</small>
                </div>
                <div class="details-row">
                    <small>Started</small>
                    <small>{{ startedAt }}</small>
                </div>
                <div class="details-row">
                    <small>Due</small>
                    <small>{{ dueAt }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-container {
    @apply border border-solid border-t-4 border-slate-400 p-3 rounded-md
    flex flex-col gap-2 hover:cursor-move;

    &.todo {
        @apply border-t-blue-500;
    }

    &.in-progress {
        @apply border-t-orange-500;
    }

    &.done {
        @apply border-t-green-500;
    }

    .title-container {
        @apply flex justify-between items-start gap-2;
        .title {
            @apply font-bold text-base truncate m-0;

            a {
                @apply text-gray-700 no-underline hover:underline;
            }
        }

        .delete-btn {
            @apply flex-shrink-0 border-none w-6 h-6 flex justify-center items-center rounded-full text-gray-700 bg-red-50 hover:bg-red-500 hover:text-white;
        }
    }

    .body {
        @apply flex flex-col gap-2;

        .desc {
            @apply m-0 text-sm text-gray-800 line-clamp-4;
        }

        .details {
            .details-row {
                @apply flex justify-between;

                small {
                    @apply text-[10px] text-gray-500;
                }
            }
        }
    }
}

:deep(.delete-title) {
    @apply font-bold;
}
</style>