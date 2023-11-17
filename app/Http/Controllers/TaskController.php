<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
