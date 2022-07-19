<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function employees() {
        return $this->belongsToMany(Employee::class);
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

}
