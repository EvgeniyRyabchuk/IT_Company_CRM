<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ToDoController;
use App\Http\Controllers\OrderController;

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
    Route::post('/email/verification-notification', [VerifyEmailController::class, 'sendVerifyEmailNotification']);
    Route::post('/email/verify', [VerifyEmailController::class, 'verifyEmail']);
});

Route::post('send-password-reset-email', [ResetPasswordController::class, 'sendEmailForResetPassword']);
Route::post('password-reset/{id}/{token}', [ResetPasswordController::class, 'resetPassword'])->name('password.reset');

Route::prefix('users')->middleware('auth:api')->group(function () {
    Route::get('/', [UserController::class, 'show']);
});

Route::controller(ToDoController::class)->group(function () {
    Route::get("/todos", 'index')->middleware('auth:api');
});


Route::get('test', [UserController::class, 'test']);


Route::prefix('orders')->group(function() {
    Route::get('/', [OrderController::class, 'index']);
    Route::post('/', [OrderController::class, 'store']);

    Route::get('/{orderId}', [OrderController::class, 'show']);

    Route::put('/{orderId}', [OrderController::class, 'update']);
    Route::delete('/{orderId}', [OrderController::class, 'destroy']);
});
