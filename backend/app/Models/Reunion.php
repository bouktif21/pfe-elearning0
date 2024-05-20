<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    use HasFactory;
    protected $fillable = [
        'url',
        'date',
        'FormationId',

    ];

    // Define relationship with Enseignant model


    // Define relationship with Formation model
    public function formation()
    {
        return $this->belongsTo(Formation::class, 'FormationId');
    }
}
