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
use App\Http\Controllers\ViewController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StatisticController;

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

// public storage route
Route::get('storage/{path}', [StorageController::class, 'show'])
    ->where('path', '.*');

//TODO: resole private issue
// private storage route
Route::get('storage/private/{path}', [StorageController::class, 'showPrivate'])
    ->where('path', '.*');
//    ->middleware('auth:api');

// controllers for authorization
Route::controller(AuthController::class)
    ->prefix('auth')->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('profile', 'getProfile');
        Route::get('roles', 'getRoles');
        Route::post('login', 'login');
        Route::delete('users/{userId}', 'deleteAccount');
});


//
// Public Routes =================================================
//

Route::controller(VerifyEmailController::class)->group(function () {
    Route::post('send-password-reset-email', 'sendEmailForResetPassword');
    Route::post('password-reset/{id}/{token}', 'resetPassword')
        ->name('password.reset');
});
Route::prefix('projects')->group(function() {
    Route::get('/types', [ProjectController::class, 'getTypes']);
});

Route::prefix('vacancies')->group(function () {
    Route::get('/', [VacancyController::class, 'index']);
});

Route::prefix('job-applications')->group(function () {
    Route::post('/', [JobApplicationController::class, 'store']);
});

Route::prefix('orders')->group(function() {
    Route::post('/', [OrderController::class, 'store']);
});

//TODO: make auth access
Route::prefix('excel')
    ->controller(EmployeeController::class)
    ->group(function () {
        Route::get('employees','exportExcel');
        Route::get('customers', 'exportExcel');
});
//TODO: make auth access
Route::prefix('projects')
    ->controller(ProjectController::class)
    ->group(function() {
        // Project File Manager Routing
        Route::get("{projectId}/file-manager",'fileManager');
        Route::post("{projectId}/file-manager",'fileManager');
});

//
// Private Router =================================================
//


Route::middleware('auth:api')->group(function () {
    Route::controller(DashboardController::class)
        ->prefix('dashboard')->group(function () {
            Route::get('analytics', 'analytics');
    });

    Route::controller(VerifyEmailController::class)->group(function () {
        Route::post('/email/verification-notification','sendVerifyEmailNotification');
        Route::post('/email/verify', 'verifyEmail');
    });

    Route::prefix('users')->group(function () {
        Route::controller(EmployeeController::class)
            ->prefix('employees')->group(function() {
                Route::get('/', 'index');
                Route::post('/',  'store');

                Route::put('/{employeeId}/info','updateInfo');
                Route::put('/{employeeId}','update');

                Route::delete('/{employeeId}','destroy');

                Route::get('positions','getPositions');
                Route::get('positions/{positionId}/levels','getLevels');
                Route::get('skills','getSkills');

                Route::post('/{employeeId}/avatar', 'changeAvatar');
                Route::put('/{employeeId}/social-links', 'updateLinks');
        });

        Route::controller(CustomerController::class)
            ->prefix('customers')->group(function() {
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

        Route::controller(ChatController::class)
            ->prefix('{userId}/chats')->group(function ($e) {
                Route::get('new/{target}','getNew');
                Route::get('/', 'showChats');
                Route::post('/', 'createChat');
                Route::delete('/{chatId}', 'deleteChat');
                Route::put('/{chatId}/seen', 'allMessageSeen');
                Route::get('/{chatId}/messages', 'showMessagesByChat');
                Route::post('{chatId}/messages', 'sendMessage');
                Route::put('{chatId}/messages/{messageId}', 'updateMessage');
                Route::delete('{chatId}/messages/{messageId}', 'deleteMessage');
        });

        Route::prefix('/{employeeId}/events')
            ->controller(EventController::class)
            ->group(function () {
                Route::get("/", "index");
                Route::post("/", "store");
                Route::put("/{eventId}", "update");
                Route::delete("/{eventId}", "destroy");
        });
    });

    Route::prefix('orders')
        ->controller(OrderController::class)
        ->group(function() {
            Route::get('/statuses', 'getStatuses');
            Route::get('/min-max', 'getMinMaxValues');

            Route::get('/', 'index');

            Route::get('/{orderId}', 'show');

            Route::put('/{orderId}', 'update');
            Route::delete('/{orderId}', 'destroy');

            Route::get('/statuses/undo/cases', 'getUndoReasonCases');
            Route::post('/{orderId}/statuses/undo/cases/{caseId}', 'addUndoCaseEntry');
            Route::post('/{orderId}/create-customer-account', 'createCustomerAccount');
    });



    Route::prefix('projects')
        ->controller(ProjectController::class)
        ->group(function() {

            Route::get('/roles', 'getRoles');
            Route::get('/tags', 'getTags');
            Route::get('/min-max', 'getMaxValues');

            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{projectId}', 'show');
            Route::put('/{projectId}', 'update');
            Route::delete('/{projectId}', 'destroy');

            Route::get('/{projectId}/history', 'getHistory');
            Route::get('/{projectId}/order-info', 'getOrderInfo');


    // Project File Manager Routing
    //        Route::get("{projectId}/file-manager", [ProjectController::class, 'fileManager']);
    //        Route::post("{projectId}/file-manager", [ProjectController::class, 'fileManager']);

        Route::prefix('{projectId}/members')
            ->controller(ProjectController::class)
            ->group(function () {
                Route::post('/', 'addMember');
                Route::get('/', 'getMembers');
                Route::delete('/{memberId}', 'deleteMember');

                Route::get('{memberId}/lanes', [TaskController::class, 'getKanbanLanesByMember']);
        });

        Route::prefix('{projectId}/lanes')
            ->controller(TaskController::class)
            ->group(function () {
                Route::get('/', 'getKanbanLanes');
                Route::post('/', 'addKanbanLane');
                Route::put('/swap', 'swapKanbanLanes');
                Route::put('{laneId}', 'updateKanbanLane');

                Route::delete('{laneId}', 'deleteKanbanLane');

                Route::prefix('{laneId}/cards')->group(function() {
                    Route::get('/', 'getKanbanCardsByLaneId');
                    Route::post('/', 'addKanbanCard');

                    Route::put('{cardId}', 'updateKanbanCard');
                    Route::delete('{cardId}', 'deleteKanbanCard');

                    Route::put('{cardId}/swap', 'swapKanbanCards');
                });
        });
    });

    Route::prefix('tasks')->group(function () {
        Route::get('/', [TaskController::class, 'index']);
    });

    Route::prefix('tag')
        ->controller(TagController::class)
        ->group(function () {
            Route::post('/target/{targetId}', 'attachTag');
            Route::delete('/target/{targetId}', 'detachTag');
            Route::get('/{tagId}', 'show');
    });

    Route::prefix('news')
        ->controller(NewsController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/{newsId}', 'show');

            Route::post('/', 'store');
            Route::put('/{newsId}', 'update');
            Route::delete('/{newsId}', 'destroy');
    });

    Route::prefix('vacancies')
        ->controller(VacancyController::class)
        ->group(function () {
            Route::get('/{vacancyId}', 'show');
            Route::post('/', 'store');
            Route::put('/{vacancyId}', 'update');
            Route::delete('/{vacancyId}', 'destroy');
    });

    Route::prefix('job-applications')
        ->controller(JobApplicationController::class)
        ->group(function () {
            Route::get('/', 'index');
            Route::get('/statuses',  'getStatuses');

            Route::put('{jobApplicationId}', 'update');
            Route::delete('{jobApplicationId}', 'destroy');

            Route::get('/min-max',  'getMinMaxValues');
            Route::get('{jobApplicationId}', 'show');
    });



    Route::prefix('views')
        ->controller(ViewController::class)
        ->group(function () {
            Route::get('/', 'getCounter');
            Route::post('/{viewable}', 'markNewsAsSeen');
    });


    Route::controller(TransactionController::class)
        ->group(function () {
            Route::get('/customers/transactions','getByCustomer');
            Route::get('/orders/{orderId}/transactions','getByOrder');
    });

    Route::controller(TransactionController::class)
        ->prefix('transactions')
        ->group(function() {
            Route::get('/', 'index');
            Route::post('/', 'pay');
    });

    Route::controller(StatisticController::class)
        ->prefix('statistic')
        ->group(function() {
            Route::get('/', 'index');
    });

});
