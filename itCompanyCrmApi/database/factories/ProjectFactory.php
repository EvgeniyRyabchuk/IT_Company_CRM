<?php

namespace Database\Factories;

use App\Models\ProjectType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $projectType = ProjectType::inRandomOrder()->take(1)->first();

        $budget = random_int(500, 3000);
        $paid = random_int(500, $budget);

        $created_at = $this->faker->dateTimeBetween('+1 day', '+2 day');
        $deadline =  $this->faker->dateTimeBetween('+1 week', '+3 month');

        return [
            'name' => $projectType->name,
            'project_type_id' => $projectType->id,
            'deadline' => $deadline,
            'budget' => $budget,
            'paid' => 0,
            'created_at' => $created_at
        ];
    }
}
