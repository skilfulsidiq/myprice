<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    //
    protected $fillable = ['shopownerid','name','address'];

//    relationship
    public function shopowner(){
        return $this->belongsTo(Shopowner::class);
    }
}
