<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribution extends Model
{
    use HasFactory;
    protected $fillable=[
        "student_id",
        "formation_id",
        "status",
];
    public function student(){
    return $this->belongsTo(User::class ,'student_id','id');
}
public function formation(){
    return $this->belongsTo(Formation::class ,'formation_id','id');
}



}
