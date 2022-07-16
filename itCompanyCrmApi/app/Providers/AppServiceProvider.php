<?php

namespace App\Providers;

use App\Http\_Sl\RoleChecker;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Gate::define('user_select', function (User $user) {
            return RoleChecker::hasRole($user, ['customer', 'admin', 'manager']);
        });

        Gate::define('user_create', function (User $user) {
            return RoleChecker::hasRole($user, ['admin', 'manager']);
        });

        Gate::define('user_update', function (User $user) {
            return RoleChecker::hasRole($user, ['admin', 'manager']);
        });

        Gate::define('user_delete', function (User $user) {
            return RoleChecker::hasRole($user, ['admin', 'manager']);
        });



    }
}
