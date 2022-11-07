<?php

namespace App\Services;

use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Collection;

class RegisterService
{
    public function register(RegisterRequest $request): Collection
    {
        $user = User::create([
           'email' => $request->email,
           'password' => bcrypt($request->password),
           'name' => $request->name
        ]);
        $token = $user->createToken('userToken')->plainTextToken;

        return collect([
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }
}
