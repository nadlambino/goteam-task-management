import { defineStore } from "pinia";
import { computed, watch, type Ref, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { TaskStatus, type ApiSuccessResponse, type Task } from '@/declarations';
import { ref } from 'vue';

type TaskListMetadata = {
    current_page: number,
    last_page: number
}

const tasksApiFetch = async (status: TaskStatus, page: Ref<number>): Promise<ApiSuccessResponse<Task[], TaskListMetadata>> => {
    const { data } = await window.axios.get(`/api/tasks?status=${status}&page=${page.value}`);
    return data;
}

export const useTasks = defineStore('tasks', () => {
    const todoPage = ref(1);
    const todos = ref<Task[]>([]);
    const { data: todoResponse, isFetched: isFetchedTodos } = useQuery({
        queryKey: ['todo-tasks', todoPage],
        queryFn: () => tasksApiFetch(TaskStatus.todo, todoPage),
    });

    watchEffect(() => {
        if (!isFetchedTodos || !todoResponse.value?.data) return;

        todos.value.push(...todoResponse.value?.data)
    })

    const getNextPage = (type: TaskStatus) => {
        if (type === TaskStatus.todo) {
            if (todoPage.value >= (todoResponse.value?.metadata?.last_page || 0)) return;

            todoPage.value = (todoResponse.value?.metadata?.current_page || 0) + 1
        } else if (type === TaskStatus.in_progress) {

        } else if (type === TaskStatus.done) {

        }
    }

    return {
        todoPage,
        todos,
        getNextPage
    }
});
