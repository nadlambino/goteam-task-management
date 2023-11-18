import { type Ref, watchEffect } from 'vue';
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

export const fetchTaskById = async <T, U = {}>(id: number): Promise<ApiSuccessResponse<T, U>> => {
    const { data } = await window.axios.get(`/api/tasks/${id}`);
    return data;
}

export const useTaskApi = (status: TaskStatus) => {
    const page = ref(1);
    const todos = ref<Task[]>([]);
    const { data: apiResponse, isFetched: isFetchedTodos } = useQuery({
        queryKey: ['tasks', `${status}-tasks`, page, status],
        queryFn: () => tasksApiFetch(status, page),
    });

    watchEffect(() => {
        if (!isFetchedTodos || !apiResponse.value?.data) return;

        todos.value = [...todos.value, ...apiResponse.value?.data];
    })

    const getNextPage = () => {
        if (page.value >= (apiResponse.value?.metadata?.last_page || 0)) return;

        page.value = (apiResponse.value?.metadata?.current_page || 0) + 1
    }

    return {
        todos,
        getNextPage,
    }
}
