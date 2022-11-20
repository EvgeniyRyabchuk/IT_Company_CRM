<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UndoOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'order_undo_case_id',
        'extra_reason_text'
    ];

    public function orderUndoCase() {
        return $this->belongsTo(UndoOrderCase::class);
    }
}
