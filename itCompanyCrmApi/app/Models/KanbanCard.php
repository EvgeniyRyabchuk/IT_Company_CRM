<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KanbanCard extends Model
{
    use HasFactory;


    public function tags() {
        return $this->belongsToMany(KanbanPriority::class);
    }

    public function lane() {
        return $this->belongsTo(KanbanLane::class);
    }
}
