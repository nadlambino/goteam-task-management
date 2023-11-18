import { TaskStatus } from "@/declarations";
import { useTaskApi } from "@/hooks/useTaskApi";
import { defineStore } from "pinia";

export const useTasks = defineStore('tasks', () => {
    const todosApi = useTaskApi(TaskStatus.todo);
    const todos = todosApi.todos;
    const getNextTodos = todosApi.getNextPage;

    const inprogressApi = useTaskApi(TaskStatus.in_progress);
    const inprogress = inprogressApi.todos;
    const getNextInprogress = inprogressApi.getNextPage;
    
    const doneApi = useTaskApi(TaskStatus.done);
    const done = doneApi.todos;
    const getNextDone = doneApi.getNextPage;

    return {
        todos,
        getNextTodos,
        inprogress,
        getNextInprogress,
        done,
        getNextDone,
    }
});
