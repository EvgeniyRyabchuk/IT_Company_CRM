<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Cookie;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if($request->is('api/*'))
        {
            throw new HttpResponseException(response()->json(['failure_reason'=>'Fresh or Access Token Required'], 401));
        }

        if (! $request->expectsJson()) {
            return route('login');
        }
    }
}
