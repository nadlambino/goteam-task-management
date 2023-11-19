<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', fn() => Auth::user());
    Route::apiResource('tasks', TaskController::class);
});
