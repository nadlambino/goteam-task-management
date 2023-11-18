<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->get('status', 'Todo');
        $tasks = Auth()
            ->user()
            ->tasks()
            ->where('status', $status)
            ->orderByDesc('updated_at')
            ->get()
            ->toArray();

        return $this->successResponse($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        try {
            $data = $request->validated();
            $data['due_at'] = Carbon::parse($data['due_at'])->format('Y-m-d H:i:s');
            $task = Auth()->user()->tasks()->create($data);

            if ($task) {
                return $this->successResponse($task->toArray(), code: 201);
            }

            return $this->errorResponse('Failed to create a task. Please try again.');
        } catch(\Exception $e) {
            return $this->errorResponse('Failed to create a task. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = Auth()
            ->user()
            ->tasks()
            ->find($id)
            ->toArray();

        return $this->successResponse($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {
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
        } catch (Exception) {
            return $this->errorResponse('Failed to update a task. Please try again.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
