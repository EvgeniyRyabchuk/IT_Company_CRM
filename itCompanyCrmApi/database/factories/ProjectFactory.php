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

        return [
            'name' => $projectType->name,
            'project_type_id' => $projectType->id,
            'deadline' => $this->faker->dateTimeBetween(
                '+1 week',
                '+3 month'),
            'budget' => random_int(500, 3000),
            'paid' => $paid
        ];
    }
}
