<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable= ['name','categoryid','shopownerid','price','productimage','producturl'];

//    relationship
    public function category(){
        return $this->belongsTo(Category::class,'categoryid','id');
    }
    public function shopowner(){
        return $this->belongsTo(Shopowner::class);
    }
    public function setPriceAttribute($value){
        $this->attributes['price']= str_replace(',','',$value);
    }
    public function setDealPriceAttribute($value){
        $this->attributes['dealprice']= str_replace(',','',$value);
    }
}
