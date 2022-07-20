<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    public function vacancy() {
        return $this->belongsTo(Vacancy::class);
    }

    public function vacancyStatus() {
        return $this->belongsTo(VacancyStatus::class);
    }
}
