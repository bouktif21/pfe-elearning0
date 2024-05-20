<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cour extends Model
{
    use HasFactory;
    protected $fillable=[
        "cour",
        "description",
        "file",
        "Formation_id",


];
    public function formation(){
        return $this->belongsTo(Formation::class ,'Formation_id','id');
    }
}
