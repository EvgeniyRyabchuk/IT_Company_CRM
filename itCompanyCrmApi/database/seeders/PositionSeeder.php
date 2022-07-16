<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($levels)
    {
        $models = [
        ['name' => 'frontend', ],
        ['name' => 'backend', ],
        ['name' => 'design', ],
        ['name' => 'client manager',]];

        foreach ($models as $model) {
            $position = new Position();
            $position->name = $model['name'];
            $position->save();
            $position->levels()->attach($levels[0]);
            $position->levels()->attach($levels[1]);
            $position->levels()->attach($levels[2]);
            $position->levels()->attach($levels[3]);

        }

    }
}
