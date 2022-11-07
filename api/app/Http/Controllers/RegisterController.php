<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\RegisterService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

class RegisterController extends Controller
{
    public function __construct(private readonly RegisterService $registerService)
    {
    }

    public function register(RegisterRequest $request): Response|Application|ResponseFactory
    {
        $user = $this->registerService->register($request);
        session()->put('token', $user->only('token'));
        return response($user);
    }
}
