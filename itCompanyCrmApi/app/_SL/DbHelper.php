<?php

namespace App\_Sl;


use Illuminate\Support\Facades\DB;

class DbHelper
{

    public static function nextId($tableName) {
        $statement = DB::select("show table status like '$tableName'");
        return $statement[0]->Auto_increment;
    }
}
