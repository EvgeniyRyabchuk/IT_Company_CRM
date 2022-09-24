<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    //TODO: get pivot relationships
    public function employees() {
        return
            $this->belongsToMany(Employee::class)
            ->withPivot('project_role_id');
    }

//    public function employeeCount() {
//        return
//            $this->belongsToMany(Employee::class)
//                ->count();
//    }

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

    public function lanes() {
        return $this->hasMany(KanbanLane::class);
    }

    public function history() {
        return $this->hasMany(ProjectHistory::class);
    }

}
