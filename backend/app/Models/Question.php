<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable = ['question','Qcm_id', 'answer_options', 'correct_answer'];

    protected $casts = [
        'answer_options' => 'array',
    ];

    public function Quiz()
    {
        return $this->belongsTo(Quiz::class, 'Qcm_id');
    }
}
