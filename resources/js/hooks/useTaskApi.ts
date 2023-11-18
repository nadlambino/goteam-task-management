import { TaskStatus, type ApiSuccessResponse, type Task } from '@/declarations';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
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
    const router = useRouter();

    const { mutate: createTask, isPending: isCreating } = useMutation({
        mutationFn: (formData: Task) => window.axios.post('/api/tasks', formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast('Successfully created a task.', { type: 'success' });
            const redirectTimeout = setTimeout(() => {
                router.push('/tasks');
                clearInterval(redirectTimeout);
            }, 1000);
        },
        onError: () => toast('Failed to create a task. Please try again.', { type: 'error' }),
    });

    
    const { mutate: updateTask, isPending: isUpdating } = useMutation({
        mutationFn: (formData: Task) => window.axios.put(`/api/tasks/${formData.id}`, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast('Successfully updated a task.', { type: 'success' });
            const redirectTimeout = setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['tasks'] });
                router.push('/tasks');
                clearInterval(redirectTimeout);
            }, 1000);
        },
        onError: () => toast('Failed to update a task. Please try again.', { type: 'error' }),
    });

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
        createTask,
        isCreating,
        updateTask,
        isUpdating,
        deleteTask
    }
}
