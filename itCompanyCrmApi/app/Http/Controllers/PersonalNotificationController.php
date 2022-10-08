<?php

namespace App\Http\Controllers;

use App\Models\PersonalNotification;
use App\Models\PersonalNotificationType;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\_SL\Utils;
use Illuminate\Support\Facades\Auth;

class PersonalNotificationController extends Controller
{

    public function index(Request $request, $userId)
    {
        $notList = PersonalNotification::with('type', 'user')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notList);
    }




    public static function store($payload)
    {

        abort_if(!$payload['type'], '404', 'notification type does not exist');

        $type = $payload['type'];
        $user = $payload['user'];

        $notification = new PersonalNotification();
        $notification->type()->associate($type);
        $notification->user()->associate($user);
        $notification->heading = $payload['heading'];
        $notification->timestamp =  Carbon::now()->timestamp;
        $notification->title = $payload['title'];
        $notification->subtitle = $payload['subtitle'];
        $notification->path =  Utils::getNotificationPath($type, $user->id);
        $notification->save();

        return redirect()
            ->action(
                [PersonalNotificationController::class, 'index'],
                ['userId' => $user->id]
            );
    }


    public function destroy(Request $request, $userId, $notificationId)
    {
        $notification = PersonalNotification::findOrFail($notificationId);
        $notification->delete();
        $notList = PersonalNotification::with('type', 'user')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($notList, 201);
    }

    public function destroyAll(Request $request, $userId)
    {
        PersonalNotification::where('user_id', $userId)->delete();
        $notList = PersonalNotification::with('type', 'user')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($notList, 201);
    }





}
