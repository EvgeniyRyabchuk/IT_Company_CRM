<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifyEmailController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\VacancyController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\_ChunkFileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\ChatController;


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

//header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, X-Auth-Token, Authorization, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length');
//header('Access-Control-Allow-Credentials: true');
//
//header('Access-Control-Allow-Origin: http://localhost:3000');


// public storage route
Route::get('storage/{path}', [StorageController::class, 'show'])
    ->where('path', '.*');

// private storage route
Route::get('storage/private/{path}', [StorageController::class, 'showPrivate'])
    ->where('path', '.*');
//    ->middleware('auth:api');


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

//Route::prefix('users')->middleware('auth:api')->group(function () {
Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'show']);

    Route::prefix('{userId}/chats')->group(function ($e) {
        Route::get('/', [ChatController::class, 'showChats']);
        Route::get('/{chatId}', [ChatController::class, 'showMessagesByChat']);
        Route::put('/{chatId}', [ChatController::class, 'showChats']);
        Route::delete('/{chatId}', [ChatController::class, 'deleteChat']);

        Route::prefix('{chatId}/messages')->group(function () {
            Route::post('/', [ChatController::class, 'addMessage']);
            Route::put('/', [ChatController::class, 'updateMessage']);
            Route::delete('/', [ChatController::class, 'deleteMessage']);
        });
    });


    Route::prefix('/{employeeId}/events')->group(function () {
        Route::get("/", [EventController::class, "index"]);
        Route::post("/", [EventController::class, "store"]);
        Route::put("/{eventId}", [EventController::class, "update"]);
        Route::delete("/{eventId}", [EventController::class, "destroy"]);

    });

});


Route::get('test', [UserController::class, 'test']);


Route::prefix('orders')->group(function() {
    Route::get('/', [OrderController::class, 'index']);
    Route::post('/', [OrderController::class, 'store']);

    Route::get('/{orderId}', [OrderController::class, 'show']);

    Route::put('/{orderId}', [OrderController::class, 'update']);
    Route::delete('/{orderId}', [OrderController::class, 'destroy']);

    Route::post('/{orderId}/status/undo/case/{caseId}', [OrderController::class, 'addUndoCaseEntry']);

    Route::post('/{orderId}/create-customer-account', [OrderController::class, 'createCustomerAccount']);

});


Route::prefix('projects')->group(function() {
    Route::get('/', [ProjectController::class, 'index']);
    Route::post('/', [ProjectController::class, 'store']);
    Route::get('/{projectId}', [ProjectController::class, 'show']);
    Route::put('/{projectId}', [ProjectController::class, 'update']);
    Route::delete('/{projectId}', [ProjectController::class, 'destroy']);

    // Project File Manager Routing
    Route::get("{projectId}/file-manager", [ProjectController::class, 'fileManager']);
    Route::post("{projectId}/file-manager", [ProjectController::class, 'fileManager']);

    Route::prefix('{projectId}/members')->group(function () {
        Route::get('/', [ProjectController::class, 'getMembers']);
        Route::post('/{memberId}', [ProjectController::class, 'addMember']);
        Route::delete('/{memberId}', [ProjectController::class, 'deleteMember']);

        Route::get('{memberId}/lanes', [TaskController::class, 'getKanbanLanesByMember']);
    });

    Route::prefix('{projectId}/lanes')->group(function () {

        Route::get('/', [TaskController::class, 'getKanbanLanes']);

        Route::post('/', [TaskController::class, 'addKanbanLane']);

        Route::put('/swap', [TaskController::class, 'swapKanbanLanes']);

        Route::put('{laneId}', [TaskController::class, 'updateKanbanLane']);



        Route::delete('{laneId}', [TaskController::class, 'deleteKanbanLane']);

        Route::prefix('{laneId}/cards')->group(function() {
            Route::get('/', [TaskController::class, 'getKanbanCardsByLaneId']);
            Route::post('/', [TaskController::class, 'addKanbanCard']);

            Route::put('{cardId}', [TaskController::class, 'updateKanbanCard']);
            Route::delete('{cardId}', [TaskController::class, 'deleteKanbanCard']);

            Route::put('{cardId}/swap', [TaskController::class, 'swapKanbanCards']);
        });
    });

//    Route::post('/{projectId}', [ProjectController::class, 'destroy']);
});

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);
});
Route::prefix('tag')->group(function () {
    Route::post('/target/{targetId}', [TagController::class, 'attachTag']);
    Route::delete('/target/{targetId}', [TagController::class, 'detachTag']);
    Route::get('/{tagId}', [TagController::class, 'show']);
});

Route::prefix('news')->group(function () {
    Route::get('/', [NewsController::class, 'index']);
    Route::get('/{newsId}', [NewsController::class, 'show']);

    Route::post('/', [NewsController::class, 'store']);
    Route::put('/{newsId}', [NewsController::class, 'update']);
    Route::delete('/{newsId}', [NewsController::class, 'destroy']);
});

Route::prefix('vacancies')->group(function () {
    Route::get('/', [VacancyController::class, 'index']);
    Route::get('/{vacancyId}', [VacancyController::class, 'show']);

    Route::post('/', [VacancyController::class, 'store']);
    Route::put('/{vacancyId}', [VacancyController::class, 'update']);
    Route::delete('/{vacancyId}', [VacancyController::class, 'destroy']);
});

Route::prefix('job-applications')->group(function () {
    Route::get('/', [JobApplicationController::class, 'index']);
    Route::get('{jobApplicationId}', [JobApplicationController::class, 'show']);

    Route::post('/', [JobApplicationController::class, 'store']);
    Route::put('{jobApplicationId}', [JobApplicationController::class, 'update']);
    Route::delete('{jobApplicationId}', [JobApplicationController::class, 'destroy']);
});

