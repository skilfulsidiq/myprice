<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Shopowner;
use Auth;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function Role(){
        return $this->belongsTo(Role::class);
    }
    public function shopowner(){
        return $this->hasMany(Shopowner::class);
    }
    public function isNew()
    {
        $authUser = $this->id;
        $shop = Shopowner::where(['userid'=>$authUser])->get();
        // dd($shop);
        if($shop->isEmpty()){
            return true;
        }else{
            return false;
        }
    }

    public function isAdmin(){
        if($this->id === 1){
            return true;
        }else{
            return false;
        }
    }
}
