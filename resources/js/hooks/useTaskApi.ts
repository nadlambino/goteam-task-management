import { TaskStatus, type ApiSuccessResponse, type Task } from '@/declarations';

export const useTaskApi = () => {
    const fetchTasks = async (status: TaskStatus): Promise<ApiSuccessResponse<Task[]>> => {
        const { data } = await window.axios.get(`/api/tasks?status=${status}`);
        return data;
    }

    const fetchTaskById = async (id: number): Promise<ApiSuccessResponse<Task>> => {
        const { data } = await window.axios.get(`/api/tasks/${id}`);
        return data;
    }

    return {
        fetchTasks,
        fetchTaskById
    }
}
