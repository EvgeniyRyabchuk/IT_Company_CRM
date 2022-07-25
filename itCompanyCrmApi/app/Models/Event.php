<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;


    public function recurring() {
        return $this->belongsTo(RecurrentEvent::class,
            "recurrent_events_id",
            "id");
    }

    public function employee() {
        return $this->belongsTo(Employee::class,
            "uid",
            "id");
    }
}
