<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UserVerification;
use App\Notifications\EmailVerificationNotification;
use Carbon\Carbon;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class VerifyEmailController extends Controller
{
    public function sendVerifyEmailNotification(Request $request) {

        $verification = UserVerification::create([
            'verification_type' => 'email',
            'token' => rand(100000, 999999),
            'expired_at' => Carbon::now()->addDays(3),
            'user_id' => Auth::user()->id
        ]);

        Notification::send(Auth::user(), new EmailVerificationNotification($verification));

        return ['message'=> 'OK.'];
    }

    public function verifyEmail(Request $request)
    {
        $veritication = UserVerification::where('token', $request->input('token'))->first();

        if(is_null($veritication))
            abort(403, 'is null');
        $user = Auth::user();

        abort_if(!$user, 403);
        if($user->id != $veritication->user->id)
            abort(403, 'no match');


        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();

            $veritication->delete();
//            UserVerification::destroy($veritication->id);

            //TODO: read doc
            event(new Verified($user));
        }

        return response()->json(['status' => 'success', 'data' => $veritication], 201);
    }
}
