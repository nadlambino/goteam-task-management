<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    public function __construct(protected TaskService $taskService) { }

    /**
     * Get tasks of authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->get('search');
        $status = $request->get('status');
        $due = $request->get('due');
        $tasks = $this->taskService->getTasks($search, $status, $due);

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
        $task = $this->taskService->createTask($data);

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
        $task = $this->taskService->getTaskById($id);

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
        $task = $this->taskService->updateTask($task, $data);

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
        $task = $this->taskService->deleteTask($id);

        if (!$task) {
            return $this->errorResponse("Task with id of $id does not exists", code: 404);
        }

        return $this->successResponse();
    }
}
