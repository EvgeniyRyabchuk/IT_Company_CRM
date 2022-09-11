<?php

use App\Http\Controllers\_ChunkFileController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PersonalNotificationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StorageController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\CustomerController;
use App\Http\Controllers\User\EmployeeController;
use App\Http\Controllers\User\ResetPasswordController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\VerifyEmailController;
use App\Http\Controllers\VacancyController;
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

//header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, X-Auth-Token, Authorization, Content-Type, X-Auth-Token, Accept,charset,boundary,Content-Length');
//header('Access-Control-Allow-Credentials: true');
//header('Access-Control-Allow-Origin: http://localhost:3001');
//header("Content-Type: *");

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

    Route::get('profile', 'getProfile');

    Route::get('roles', 'getRoles');
});


Route::middleware("auth:api")->group(function () {
    Route::post('/email/verification-notification', [VerifyEmailController::class, 'sendVerifyEmailNotification']);
    Route::post('/email/verify', [VerifyEmailController::class, 'verifyEmail']);
});

Route::post('send-password-reset-email', [ResetPasswordController::class, 'sendEmailForResetPassword']);
Route::post('password-reset/{id}/{token}', [ResetPasswordController::class, 'resetPassword'])->name('password.reset');

//Route::prefix('users')->middleware('auth:api')->group(function () {
Route::prefix('users')->group(function () {

    Route::controller(EmployeeController::class)
        ->prefix('employees')
            ->group(function() {
            Route::get('/', 'index');
            Route::post('/',  'store');
            Route::put('/{employeeId}','update');
            Route::delete('/{employeeId}','destroy');

            Route::get('positions','getPositions');
            Route::get('positions/{positionId}/levels','getLevels');
            Route::get('skills','getSkills');
    });

    Route::controller(CustomerController::class)
        ->prefix('customers')
            ->group(function() {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{customerId}', 'update');
        Route::delete('/{customerId}', 'destroy');

        Route::put('/{customerId}/favorite', 'changeFavorite');
    });


    Route::get('/', [UserController::class, 'index']);
    Route::get('/{userId}', [UserController::class, 'show']);


    Route::prefix('{userId}/notifications')
        ->controller(PersonalNotificationController::class)
        ->group(function () {
            Route::get('/', 'index')->name('user.notifications');
            Route::post('/', 'store');
            Route::delete('/all', 'destroyAll');

            Route::delete('/{notificationId}', 'destroy');
    });


    Route::prefix('{userId}/chats')->group(function ($e) {
        Route::get('/', [ChatController::class, 'showChats']);
        Route::post('/', [ChatController::class, 'createChat']);
        Route::delete('/{chatId}', [ChatController::class, 'deleteChat']);

        Route::put('/{chatId}/seen', [ChatController::class, 'allMessageSeen']);

        Route::get('/{chatId}/messages', [ChatController::class, 'showMessagesByChat']);

        Route::post('{chatId}/messages', [ChatController::class, 'sendMessage']);
        Route::put('{chatId}/messages/{messageId}', [ChatController::class, 'updateMessage']);
        Route::delete('{chatId}/messages/{messageId}', [ChatController::class, 'deleteMessage']);
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
    Route::get('/statuses', [OrderController::class, 'getStatuses']);
    Route::get('/min-max', [OrderController::class, 'getMinMaxValues']);

    Route::get('/', [OrderController::class, 'index']);
    Route::post('/', [OrderController::class, 'store']);

    Route::get('/{orderId}', [OrderController::class, 'show']);

    Route::put('/{orderId}', [OrderController::class, 'update']);
    Route::delete('/{orderId}', [OrderController::class, 'destroy']);



    Route::post('/{orderId}/status/undo/case/{caseId}', [OrderController::class, 'addUndoCaseEntry']);
    Route::post('/{orderId}/create-customer-account', [OrderController::class, 'createCustomerAccount']);

});


Route::prefix('projects')->group(function() {
    Route::get('/types', [ProjectController::class, 'getTypes']);
    Route::get('/roles', [ProjectController::class, 'getRoles']);
    Route::get('/tags', [ProjectController::class, 'getTags']);
    Route::get('/min-max', [ProjectController::class, 'getMaxValues']);

    Route::get('/', [ProjectController::class, 'index']);
    Route::post('/', [ProjectController::class, 'store']);
    Route::get('/{projectId}', [ProjectController::class, 'show']);
    Route::put('/{projectId}', [ProjectController::class, 'update']);
    Route::delete('/{projectId}', [ProjectController::class, 'destroy']);



    // Project File Manager Routing
    Route::get("{projectId}/file-manager", [ProjectController::class, 'fileManager']);
    Route::post("{projectId}/file-manager", [ProjectController::class, 'fileManager']);

    Route::prefix('{projectId}/members')->group(function () {
        Route::post('/', [ProjectController::class, 'addMember']);
        Route::get('/', [ProjectController::class, 'getMembers']);
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

Route::prefix('excel')->group(function () {
    Route::get('employees', [EmployeeController::class, 'exportExcel']);
    Route::get('customers', [CustomerController::class, 'exportExcel']);
});
