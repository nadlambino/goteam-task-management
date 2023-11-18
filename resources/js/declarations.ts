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
    title: z
        .string({required_error: "Please input a title"})
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be at most 100 characters"),
    description: z
        .string()
        .max(1000, "Decription must be at most 1000 characters")
        .optional(),
    due_at: z
        .coerce
        .date({
            required_error: "Please input a due date",
            invalid_type_error: "Please input a valid due date"
        })
        .min(today, "Due date must be today or future date"),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.todo),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    started_at: z.coerce.date().optional(),
    id: z.number().optional()
});

export type Task = z.infer<typeof TaskSchema>;

export type ApiSuccessResponse<T, U = {}> = {
    data: T,
    metadata: U
}

export type ApiErrorResponse = {
    message: String,
    errors: []
}
