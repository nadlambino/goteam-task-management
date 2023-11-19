<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Get tasks of authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $status = $request->get('status');
        $due = $request->get('due');

        $tasks = Auth()
            ->user()
            ->tasks()
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

        return $this->successResponse($tasks);
    }

    /**
     * Store newly created task
     *
     * @param StoreTaskRequest $request
     * @return JsonResponse
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['due_at'] = Carbon::parse($data['due_at'])->format('Y-m-d H:i:s');
        $task = Auth()->user()->tasks()->create($data);

        if ($task) {
            return $this->successResponse($task->toArray(), code: 201);
        }

        return $this->errorResponse('Failed to create a task. Please try again.');
    }

    /**
     * Get a specific task of authenticated user
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        $task = Auth()
            ->user()
            ->tasks()
            ->find($id);

        if (!$task) {
            return $this->errorResponse("Task with id of $id does not exists", code: 404);
        }

        return $this->successResponse($task->toArray());
    }

    /**
     * Update a task
     *
     * @param UpdateTaskRequest $request
     * @param Task $task
     * @return JsonResponse
     */
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        $data = $request->validated();
        $data['due_at'] = Carbon::parse($data['due_at'])->format('Y-m-d H:i:s');

        $data['started_at'] = match (true) {
            !isset($data['started_at']) && $data['status'] !== 'Todo'   => now(),
            $data['status'] === 'Todo'                                  => null,
            !isset($data['started_at'])                                 => now(),
            default                                                     => null
        };
        
        $task->update($data);

        return $this->successResponse($task->toArray());
    }

    /**
     * Delete specific task of authenticated user
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        $task = Auth::user()->tasks()->find($id);

        if (!$task) {
            return $this->errorResponse("Task with id of $id does not exists", code: 404);
        }

        $task->delete();

        return $this->successResponse();
    }
}
