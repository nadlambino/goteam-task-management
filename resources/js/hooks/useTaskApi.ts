import { TaskStatus, type ApiSuccessResponse, type Task } from '@/declarations';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';

export const useTaskApi = () => {
    const fetchTasks = async (status: TaskStatus): Promise<ApiSuccessResponse<Task[]>> => {
        const { data } = await window.axios.get(`/api/tasks?status=${status}`);
        return data;
    }

    const fetchTaskById = async (id: number): Promise<ApiSuccessResponse<Task>> => {
        const { data } = await window.axios.get(`/api/tasks/${id}`);
        return data;
    }

    const queryClient = useQueryClient();
    const { mutate: deleteTask } = useMutation({
        mutationKey: ['delete-task'],
        mutationFn: async (id: number): Promise<ApiSuccessResponse<Task>> => {
            const { data } = await window.axios.delete(`/api/tasks/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast('Successfully deleted a task.', { type: 'success' })
        },
        onError: () => toast('Failed to update a task. Please try again.', { type: 'error' }),
    });

    return {
        fetchTasks,
        fetchTaskById,
        deleteTask
    }
}
