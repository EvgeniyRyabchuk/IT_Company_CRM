<?php

use App\Http\Controllers\AuthController;
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

header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length');
header('Access-Control-Allow-Origin: *');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});


Route::middleware("auth:api")->group(function () {
    Route::post('/email/verification-notification',
        [\App\Http\Controllers\UserController::class, 'sendVerifyEmailNotification']);

    Route::post('/email/verify', [\App\Http\Controllers\UserController::class, 'verifyEmail']);
});

Route::post('send-password-reset-email', [\App\Http\Controllers\UserController::class, 'sendEmailForResetPassword']);
Route::post('password-reset/{id}/{token}', [\App\Http\Controllers\UserController::class, 'resetPassword'])->name('password.reset');

Route::prefix('users')->middleware('auth:api')->group(function () {

    Route::get('/', [\App\Http\Controllers\UserController::class, 'show']);

//    Route::get('/{userId}', [\App\Http\Controllers\UserController::class, 'index']);
//    Route::get('/{userId}', [\App\Http\Controllers\UserController::class, 'index']);
//    Route::get('/', [\App\Http\Controllers\UserController::class, 'index']);
//    Route::get('/', [\App\Http\Controllers\UserController::class, 'index']);
//    Route::get('/', [\App\Http\Controllers\UserController::class, 'index']);
//    Route::get('/', [\App\Http\Controllers\UserController::class, 'index']);

});

Route::controller(\App\Http\Controllers\ToDoController::class)->group(function () {
    Route::get("/todos", 'index')->middleware('auth:api');

});
