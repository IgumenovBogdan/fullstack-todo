<?php

namespace App\Services;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function login(LoginRequest $request): array
    {
        $user = User::where('email', $request->email)->first();

        if (!Hash::check($request->password, $user->password)) {
            return throw ValidationException::withMessages(['password' => 'Invalid password']);
        }

        return [
            'user' => new UserResource($user),
            'token' => $user->createToken('userToken')->plainTextToken
        ];
    }

    public function logout(Request $request): array
    {
        $request->user()->tokens()->delete();
        return ['message' => 'Logged out'];
    }

    public function getUserByToken(Request $request): UserResource
    {
        $user = User::findOrFail($request->user()->id);

        return new UserResource($user);
    }
}
