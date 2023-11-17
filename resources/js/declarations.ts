import { z } from 'zod';

export type User = {
    created_at: string;
    email: string;
    email_verified_at: string;
    id: number;
    name: string;
    updated_at: string;
};

export enum TaskStatus {
    todo = 'Todo',
    in_progress = 'In Progress',
    done = 'Done'
};

const today = new Date();
today.setHours(0, 0, 0, 0);

export const TaskSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(1000).optional(),
    due_at: z.coerce.date().min(today, "Due date must be greater than or equal today"),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.todo)
});

export type Task = z.infer<typeof TaskSchema>;