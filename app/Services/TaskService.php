<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class TaskService 
{
    public function __construct(protected Task $task) { }

    /**
     * Get tasks of authenticated user
     * When $search is provided, filter with title and body
     * When $status is provided, filter with status (Todo, In Progress, Done)
     * When $due is provided, filter due_at
     * $due = today || past
     * today = due_at is today
     * past = due_at is previous date
     *
     * @param string|null $search
     * @param string $status
     * @param string|null $due
     * @return array
     */
    public function getTasks(?string $search, ?string $status, ?string $due): array
    {
        return Auth()
            ->user()
            ->tasks()
            ->when(!empty($search), function($query) use ($search) {
                $query->where(function($query) use ($search) {
                    $query->where('title', 'LIKE', "%$search%")
                        ->orWhere('description', 'LIKE', "%$search%");
                });
            })
            ->when(!empty($status), function($query) use ($status) {
                $query->where('status', $status);
            })
            ->when(!empty($due), function($query) use ($due) {
                if ($due === 'today') {
                    return $query->whereBetween('due_at', [
                        Carbon::today()->startOfDay(),
                        Carbon::today()->endOfDay()
                    ])
                    ->where('status', '!=', 'Done');
                }
                if ($due === 'past') {
                    return $query->where('due_at', '<', Carbon::today())
                    ->where('status', '!=', 'Done');
                }
            })
            ->orderBy('sort')
            ->orderByDesc('updated_at')
            ->get()
            ->toArray();
    }

    /**
     * Create a task
     *
     * @param array $data
     * @return Task|null
     */
    public function createTask(array $data): ?Task
    {
        $data['due_at'] = $this->parseDate($data['due_at']);

        return Auth()->user()->tasks()->create($data);
    }

    /**
     * Get task by ID
     *
     * @param string|integer $id
     * @return Task|null
     */
    public function getTaskById(string|int $id): ?Task
    {
        return Auth()
            ->user()
            ->tasks()
            ->find($id);
    }

    /**
     * Update a task
     *
     * @param Task $task
     * @param array $data
     * @return Task
     */
    public function updateTask(Task $task, array $data): Task
    {
        $data['due_at'] = $this->parseDate($data['due_at']);

        $data['started_at'] = match (true) {
            !isset($data['started_at']) && $data['status'] !== 'Todo'   => now(),
            $data['status'] === 'Todo'                                  => null,
            !isset($data['started_at'])                                 => now(),
            default                                                     => null
        };
        
        $task->update($data);

        return $task;
    }

    /**
     * Delete a task
     *
     * @param string|integer $id
     * @return boolean
     */
    public function deleteTask(string|int $id): bool
    {
        $task = Auth::user()->tasks()->find($id);

        if (!$task) {
            return false;
        }

        return $task->delete();
    }

    /**
     * Parse a date and convert to proper format
     *
     * @param string $date
     * @return string
     */
    private function parseDate(string $date): string
    {
        return Carbon::parse($date)->format('Y-m-d H:i:s');
    }
}
