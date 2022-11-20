<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KanbanLane extends Model
{
    use HasFactory;


    public function employee() {
        return $this->belongsTo(Employee::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function cards() {
        return $this->hasMany(KanbanCard::class, 'lane_id', 'id');
    }



}
