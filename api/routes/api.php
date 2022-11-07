<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', [AuthController::class, 'getUserByToken']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource('/todos', TodoController::class);

    Route::put('/todos/{id}/toggle', [TodoController::class, 'toggleTodo']);
});
