<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shopowner extends Model
{
    //
    protected $fillable = ['userid','name','brandphoto','address','phone'];

    public function product(){
        return $this->hasMany(Product::class);
    }
    public function branches(){
        return $this->hasMany(Branch::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}
