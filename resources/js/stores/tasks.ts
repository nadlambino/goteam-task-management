import { TaskStatus, type Task } from "@/declarations";
import { useTaskApi } from "@/hooks/task-api";
import { useQuery } from "@tanstack/vue-query";
import { defineStore } from "pinia";
import { ref } from 'vue';
import { refDebounced } from '@vueuse/core'

export const useTasksStore = defineStore('tasks', () => {
    const taskApi = useTaskApi();
    const searchKey = ref();
    const debouncedSearchKey = refDebounced(searchKey, 600)

    const { data: todos, isPending: pendingTodos } = useQuery<Task[]>({
        queryKey: ['tasks', 'todo', debouncedSearchKey],
        queryFn: async () => {
            const { data } = await taskApi.fetchTasks(TaskStatus.todo, undefined, debouncedSearchKey.value);
            return data;
        }
    });

    const { data: inprogress, isPending: pendingInprogress } = useQuery<Task[]>({
        queryKey: ['tasks', 'inprogress', debouncedSearchKey],
        queryFn: async () => {
            const { data } = await taskApi.fetchTasks(TaskStatus.in_progress, undefined, debouncedSearchKey.value);
            return data;
        }
    });

    const { data: done, isPending: pendingDone } = useQuery<Task[]>({
        queryKey: ['tasks', 'done', debouncedSearchKey],
        queryFn: async () => {
            const { data } = await taskApi.fetchTasks(TaskStatus.done, undefined, debouncedSearchKey.value);
            return data;
        }
    });

    return {
        todos,
        pendingTodos,
        inprogress,
        pendingInprogress,
        done,
        pendingDone,
        searchKey
    }
});
