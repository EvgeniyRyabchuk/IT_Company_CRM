<?php

namespace App\_Sl;



use App\Models\PersonalNotificationType;

class Utils
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

    public static function getNumberParts($number, $countryCode) {
        $phoneUtil = \libphonenumber\PhoneNumberUtil::getInstance();

        echo $countryCode;
        // Country Code: 380 National Number: 985882884
        $swissNumberProto = $phoneUtil->parse($number, $countryCode);

        // 098 588 2884
        $formatNumber = $phoneUtil->format($swissNumberProto,
            \libphonenumber\PhoneNumberFormat::NATIONAL);
//        dd($formatNumber);
        $parts = explode(' ', $formatNumber);
        return $parts;

    }
}
