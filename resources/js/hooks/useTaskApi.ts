import { type Ref, watchEffect } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { TaskStatus, type ApiSuccessResponse, type Task } from '@/declarations';
import { ref } from 'vue';

type TaskListMetadata = {
    current_page: number,
    last_page: number
}

const tasksApiFetch = async (status: TaskStatus): Promise<ApiSuccessResponse<Task[], TaskListMetadata>> => {
    const { data } = await window.axios.get(`/api/tasks?status=${status}`);
    return data;
}

export const fetchTaskById = async <T, U = {}>(id: number): Promise<ApiSuccessResponse<T, U>> => {
    const { data } = await window.axios.get(`/api/tasks/${id}`);
    return data;
}

export const useTaskApi = (status: TaskStatus) => {
    const todos = ref<Task[]>([]);
    const { data: apiResponse, isFetched: isFetchedTodos } = useQuery({
        queryKey: ['tasks', `${status}-tasks`, status],
        queryFn: () => tasksApiFetch(status),
    });

    watchEffect(() => {
        if (!isFetchedTodos || !apiResponse.value?.data) return;

        todos.value = apiResponse.value?.data;
    })
    return {
        todos,
    }
}
