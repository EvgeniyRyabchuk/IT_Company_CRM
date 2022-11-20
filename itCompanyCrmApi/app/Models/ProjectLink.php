<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'link',
        'project_id'
    ];

    public function project() {
        return $this->belongsTo(Project::class);
    }

}
