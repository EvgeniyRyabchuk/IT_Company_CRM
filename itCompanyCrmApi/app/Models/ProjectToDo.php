<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectToDo extends Model
{
    use HasFactory;


    public function employee() {
        return $this->belongsTo(Employee::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function todoStatus()
    {
        return $this->belongsTo(ToDoStatus::class);
    }

    public function todoType()
    {
        return $this->belongsTo(ToDoType::class);
    }

}
