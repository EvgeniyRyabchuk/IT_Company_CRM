<?php

namespace App\_Sl;


use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RoleChecker
{

    // at least one role match
    public static function hasRole(User $user, array $roleNames) {
        foreach ($user->roles as $role) {
            foreach ($roleNames as $roleName) {
                if($role->name == $roleName) {
                    return true;
                }
            }
        }
        return false;
    }

    // all roles match
    public static function hasRoles(User $user, array $roleNames) {
        if(count($roleNames) == 0) return false;

        foreach ($user->roles as $role) {
            foreach ($roleNames as $roleName) {
                if($role->name != $roleName) {
                    return false;
                }
            }
        }

        return true;
    }
}
