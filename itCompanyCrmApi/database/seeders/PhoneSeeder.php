<?php

namespace Database\Seeders;

use App\Models\Phone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PhoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($user, $count = 10)
    {
        Phone::factory()->count($count)->create()
            ->each(function ($phone) use($user) {
                $phone->user()->associate($user);
        });
    }
}
