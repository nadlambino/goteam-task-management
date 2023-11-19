import { TaskStatus, type ApiSuccessResponse, type Task } from '@/declarations';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

type Due = 'today' | 'past' | undefined;

export const useTaskApi = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const fetchTasks = async (status: TaskStatus | undefined = undefined, due: Due = undefined): Promise<ApiSuccessResponse<Task[]>> => {
        const params = {status, due};
        const searchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(params)) {
            if (value) {
                searchParams.append(key, value);
            }
        }

        const searchString = searchParams.toString();
        const { data } = await window.axios.get(`/api/tasks?${searchString}`);
        return data;
    }

    const fetchTaskById = async (id: number): Promise<ApiSuccessResponse<Task>> => {
        const { data } = await window.axios.get(`/api/tasks/${id}`);
        return data;
    }

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
