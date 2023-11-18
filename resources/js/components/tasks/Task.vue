<script setup lang="ts">
import type { Task } from '@/declarations';
import { computed } from 'vue';
import moment from 'moment';

const props = defineProps<{
    task: Task
}>();

const statusClass = computed(() => props.task.status.toLowerCase().replace(' ', '-'));
const createdAt = computed(() => moment(props.task.created_at).format('MMM DD YYYY'));
const startedAt = computed(() => props.task.started_at ? moment(props.task.started_at).format('MMM DD YYYY') : '-');
const dueAt = computed(() => props.task.due_at ? moment(props.task.due_at).format('MMM DD YYYY') : '-');
</script>

<template>
    <div class="task-container" :class="statusClass">
        <h4 class="title" :title="task.title">
            <router-link :to="`/tasks/${task.id}`">
                {{ task.title }}
            </router-link>
        </h4>
        <div class="body">
            <p class="desc">{{ task.description }}</p>
            <div class="details">
                <div class="details-row">
                    <small>Created At</small>
                    <small>{{ createdAt }}</small>
                </div>
                <div class="details-row">
                    <small>Started At</small>
                    <small>{{ startedAt }}</small>
                </div>
                <div class="details-row">
                    <small>Due At</small>
                    <small>{{ dueAt }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-container {
    @apply border border-solid border-t-4 border-slate-400 p-3 rounded-md
    flex flex-col gap-2;

    &.todo {
        @apply border-t-blue-500;
    }

    &.in-progress {
        @apply border-t-orange-500;
    }

    &.done {
        @apply border-t-green-500;
    }
    
    .title {
        @apply font-bold text-base truncate m-0;

        a {
            @apply text-gray-800 no-underline hover:underline;
        }
    }

    .body {
        @apply flex flex-col gap-2;

        .desc {
            @apply m-0 text-sm;
        }

        .details {
            .details-row {
                @apply flex justify-between;

                small {
                    @apply text-[10px];
                }
            }
        }
    }
}
</style>