<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the user's tasks.
     */
    public function index()
    {
        $tasks = auth()->user()
            ->tasks()
            ->latest()
            ->get();

        return response()->json($tasks);
    }

    /**
     * Store a newly created task for the authenticated user.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = auth()->user()
            ->tasks()
            ->create($request->validated());

        return response()->json($task, 201);
    }

    /**
     * Display the specified task.
     */
    public function show(Task $task)
    {
        $this->authorizeTask($task);

        return response()->json($task);
    }

    /**
     * Update the specified task.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorizeTask($task);

        $task->update($request->validated());

        return response()->json($task);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorizeTask($task);

        $task->delete();

        return response()->json(null, 204);
    }

    /**
     * Ensure the task belongs to the authenticated user.
     */
    protected function authorizeTask(Task $task): void
    {
        if ($task->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
    }
}
