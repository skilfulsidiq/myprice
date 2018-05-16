<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Product;
use App\Category;
use App\Shopwoner;

class AdminController extends Controller
{
    //
    public function __construct(){
        $this->middleware('admin');
    }
    public function index(){
        return view('admin.dashboard');
    }
    public function addShopOwner(Request $request){
        $shopowner = new Shopowner();

    }


}
