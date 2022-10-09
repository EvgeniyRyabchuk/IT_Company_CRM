<?php

namespace App\_Sl;

use Illuminate\Support\Str;

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

    public static function getModelByTableName($tableName) {
        $folderName = 'App\\Models';
        $name =  $folderName . '\\' . Str::studly(strtolower(STR::singular($tableName)));

        $clearStr = str_replace('"', "", $name);
        $_class = new $clearStr();
        return $_class;
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
