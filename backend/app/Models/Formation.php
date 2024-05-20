<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory;
    protected $fillable = ['title','idEnseignant', 'description', 'length','price'];
    public function enseignant()
    {
        return $this->belongsTo(User::class, 'idEnseignant');
    }
}
