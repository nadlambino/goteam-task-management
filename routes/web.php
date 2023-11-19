<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

Auth::routes(['reset' => false]);
Route::get('{any}', [HomeController::class, 'index'])
    ->where('any', '.*');
