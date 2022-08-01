<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KanbanCard>
 */
class KanbanCardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return array(
            'lane_id' => 1,
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(5),
            'index' => 1,
            'label' => Carbon::now(),
            'cardColor' => $this->faker->hexColor
        );
    }
}
