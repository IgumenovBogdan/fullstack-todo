<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\CreateTodoRequest;
use App\Http\Requests\SearchTodosRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use App\Repositories\TodosRepository;
use App\Services\TodoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TodoController extends Controller
{
    public function __construct(
        private readonly TodoService $todoService,
        private readonly TodosRepository $todosRepository
    )
    {
    }

    public function index(SearchTodosRequest $request): AnonymousResourceCollection
    {
        return TodoResource::collection($this->todosRepository->getAll($request));
    }

    public function store(CreateTodoRequest $request): TodoResource
    {
        return $this->todoService->store($request);
    }

    public function show(Todo $todo): TodoResource
    {
        return new TodoResource($todo);
    }

    public function update(UpdateTodoRequest $request, Todo $todo): TodoResource
    {
        return $this->todoService->update($request, $todo);
    }

    public function destroy(Todo $todo): JsonResponse
    {
        return response()->json([
            'data' => $todo->delete()
        ]);
    }

    public function toggleTodo($id): TodoResource
    {
        return $this->todoService->toggleTodo($id);
    }
}
