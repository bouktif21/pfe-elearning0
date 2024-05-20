<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'formation_id',
        'expirationDate',
        'enseignant_id',

    ];

    // Define relationship with Enseignant model


    // Define relationship with Formation model
    public function formation()
    {
        return $this->belongsTo(Formation::class, 'formation_id');
    }
}
