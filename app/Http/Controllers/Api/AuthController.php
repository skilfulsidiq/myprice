<?php
/* created by skilfulsidiq (osodiq@gmail.com)
/*  9/5/2018  11:40AM
**/
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Product;
use App\Category;
use App\Shopowner;

class AuthController extends Controller
{
    //
    public $successStatus = 200;

    public function login(Request $request){
        if(Auth::attempt(['email'=>request('email'),'password'=>request('password')])){
            $user = Auth::user();
            $data = ['status'=>"success",'data'=>$user];
            return response()->json($data);
        }else{
            return response()->json(['status'=>'failed'],400);
        }
    }
//    regiser
    public function register(Request $request){
        $input = $request->all();
       
        $validator = Validator::make($request->all(), ['name'=>'required','email'=>'required','password'=>'required']);
        if($validator->fails()){
            return response()->json(['status'=>'falied'],401);
        }
        $user = User::where(['email'=>$request['email']])->first();
        if (!empty($user->email)){
            $data = ['status' => 'User Already Exist', 'data' => $user];
            return response()->json($data,401);
        }

        $input['password'] =bcrypt($input['password']);
        $user = User::create($input);
        $data = ['status' => "success", 'data' => $user];
        return response()->json($data);

    }

}
