<?php

namespace App\_Sl;



use App\Models\PersonalNotificationType;

class Uttils
{
    public static function getNotificationPath(PersonalNotificationType $notPype, $userId) {
        switch ($notPype->name) {
            case 'chat':
                return "chats";
            case 'notifications':
                return "notifications";
            default:
                return "";

        }
    }
}