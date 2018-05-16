<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
//use Illuminate\Support\Facades\Auth;
//use Validator;
use App\Product;
use App\Category;
use App\Shopowner;
use DB;


class OperationController extends Controller
{
    //

    //get all product api
    public function getAllProduct(){
        $product = DB::table('products')->select('products.id','products.name','products.price','products.productimage','products.producturl',
            'categories.name as category','shopowners.name as shopowner')
            ->join('categories','products.categoryid','=','categories.id')
            ->leftJoin('shopowners','products.shopownerid','=','shopowners.id')->get();
       
        return response()->json($product);
    }
//    list all categories
    public function getCategory(){
        $category = Category::all();
        return response()->json($category);
    }
//    get all product from a categories
        public function getAllProductsFromACategory($id){
           $catproduct = Product::where(['categoryid'=>$id])->get();
            
            return response()->json($catproduct);
        }

//    show a product details
    public function getAProduct($id){
        $oneproduct = DB::table('products')->select('products.id','products.name','products.price','products.productimage','products.producturl',
		'categories.name as category',
            'shopowners.name as shopowner','shopowners.brandphoto as ownerbrand',
            'shopowners.address as owneraddress','shopowners.url as ownerurl')
            ->join('categories','products.categoryid','=','categories.id')
            ->leftJoin('shopowners','products.shopownerid','=','shopowners.id')
            ->where(['products.id'=>$id])->get();
        return response()->json($oneproduct);
    }
     public function getThreeStorePrice($id){
         $threeProductPrice = DB::table('products')->select('products.id','products.name','products.price','products.productimage','products.producturl',
          'shopowners.name as shopowner','shopowners.brandphoto as ownerbrand',
            'shopowners.address as owneraddress','shopowners.url as ownerurl')
            ->join('shopowners','products.id','=','shopowners.id')
            ->where('products.price','<=',$id)
            ->orderBy('products.price','asc')->get();
            return response()->json($threeProductPrice);
     }
    
//    show 3 products the lowest price
    public function getThreeProducts(){
        $product = DB::table('products')->select('products.id','products.name','products.price','products.productimage','products.producturl',
            'categories.name as category','shopowners.name as shopowner')
            ->join('categories','products.categoryid','=','categories.id')
            ->leftJoin('shopowners','products.shopownerid','=','shopowners.id')
            ->orderBy('products.price','asc')
            ->limit(3)->get();
       
        return response()->json($product);
    }
}
