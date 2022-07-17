<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectHistory>
 */
class ProjectHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $initiator = Employee::inRandomOrder()->first();
        $project = Project::inRandomOrder()->first();

        return [
            'employee_id' => $initiator->id,
            'project_id' => $project->id,
            'action' => $this->faker->sentence(2),
        ];
    }
}
