<?php

namespace App\Providers;

use App\_Sl\RoleChecker;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
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
        $this->app->register(\L5Swagger\L5SwaggerServiceProvider::class);
//        $this->app->register(\App\_Sl\);
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {



        Schema::defaultStringLength(191);
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


        Paginator::useBootstrap();

        Collection::macro('paginate', function($perPage, $total = null, $page = null, $pageName = 'page') {
            $page = $page ?: LengthAwarePaginator::resolveCurrentPage($pageName);
            return new LengthAwarePaginator(
                $this->forPage($page, $perPage),
                $total ?: $this->count(),
                $perPage,
                $page,
                [
                    'path' => LengthAwarePaginator::resolveCurrentPath(),
                    'pageName' => $pageName,
                ]
            );
        });

    }
}
