<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function skills() {
        return $this->belongsToMany(Skill::class);
    }

    public function projects() {
        return $this->belongsToMany(Project::class);
    }
}
