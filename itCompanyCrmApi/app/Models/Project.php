<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function employees() {
        return
            $this->belongsToMany(Employee::class)
            ->withPivot('project_role_id');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function projectType() {
        return $this->belongsTo(ProjectType::class);
    }


    public function order() {
        return $this->hasOne(Order::class);
    }

    public function projectLinks() {
        return $this->hasMany(ProjectLink::class);
    }

    public function projectTodos() {
        return $this->hasMany(ProjectToDo::class);
    }
}
