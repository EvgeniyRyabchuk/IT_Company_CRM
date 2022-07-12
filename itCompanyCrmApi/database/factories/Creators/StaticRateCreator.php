<?php

namespace Database\Factories\Creators;

use App\Models\Role;
use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker;

class StaticRateCreator extends StaticCreator
{

    function __construct($model) {
        parent::__construct($model);
    }


}
