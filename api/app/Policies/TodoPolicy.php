<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TodoPolicy
{
    use HandlesAuthorization;

    public function access(User $user, Todo $todo): Response
    {
        return $todo->user_id === $user->id
            ? Response::allow()
            : Response::deny('You do not own this todo.');
    }
}
