<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Project;
use App\Models\ToDoStatus;
use App\Models\ToDoType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectToDo>
 */
class ProjectToDoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $project = Project::inRandomOrder()->first();
        $employee = $project->employees->random();
        $status = ToDoStatus::inRandomOrder()->first();
        $type = ToDoType::inRandomOrder()->first();

        return [
            'project_id' => $project->id,
            'employee_id' => $employee->id,
            'todo_status_id' => $status->id,
            'todo_type_id' => $type->id,
            'text' => $this->faker->text(100),
            'color' => $this->faker->hexColor(),
            'priority' => strtoupper($this->faker->randomLetter())
        ];
    }
}
