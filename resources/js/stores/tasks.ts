import { TaskStatus, type Task } from "@/declarations";
import { useTaskApi } from "@/hooks/useTaskApi";
import { useQuery } from "@tanstack/vue-query";
import { defineStore } from "pinia";

export const useTasks = defineStore('tasks', () => {
    const taskApi = useTaskApi();

    const { data: todos, isPending: pendingTodos } = useQuery<Task[]>({
        queryKey: ['tasks', 'todo'],
        queryFn: async () => {
            const { data } = await taskApi.fetchTasks(TaskStatus.todo);
            return data;
        }
    });

    const { data: inprogress, isPending: pendingInprogress } = useQuery<Task[]>({
        queryKey: ['tasks', 'inprogress'],
        queryFn: async () => {
            const { data } = await taskApi.fetchTasks(TaskStatus.in_progress);
            return data;
        }
    });

    const { data: done, isPending: pendingDone } = useQuery<Task[]>({
        queryKey: ['tasks', 'done'],
        queryFn: async () => {
            const { data } = await taskApi.fetchTasks(TaskStatus.done);
            return data;
        }
    });

    return {
        todos,
        pendingTodos,
        inprogress,
        pendingInprogress,
        done,
        pendingDone
    }
});
