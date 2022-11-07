<?php

declare(strict_types=1);

namespace App\Services;

use App\Http\Requests\CreateTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;

class TodoService
{
    public function store(CreateTodoRequest $request): TodoResource
    {
        $todo = Todo::create([
            'title' => $request->title,
            'user_id' => $request->user()->id,
            'is_completed' => false
        ]);

        return new TodoResource($todo);
    }

    public function update(UpdateTodoRequest $request, Todo $todo): TodoResource
    {
        $todo->update($request->only('title'));
        return new TodoResource($todo);
    }

    public function toggleTodo($id): TodoResource
    {
        $todo = Todo::findOrFail($id);
        $todo->is_completed = !$todo->is_completed;
        $todo->save();
        return new TodoResource($todo);
    }
}
