<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'position_id',
        'level_id',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function skills() {
        return $this->belongsToMany(Skill::class);
    }

    public function projects() {
        return $this->belongsToMany(Project::class);
    }

    public function position() {
        return $this->belongsTo(Position::class);
    }

    public function level() {
        return $this->belongsTo(Level::class);
    }

}
