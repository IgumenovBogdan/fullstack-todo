<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Todo;

class TodosRepository
{
    public function getAll($request)
    {
        return Todo::where('user_id', $request->user()->id)
            ->where('title', 'ilike', "%" . $request->query('s') . "%" ?? '')
            ->orderBy($request->query('orderBy') ?? 'created_at', $request->query('order') ?? 'DESC')
            ->get();
    }
}
