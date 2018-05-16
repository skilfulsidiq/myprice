<?php

namespace App\Http\Controllers;

use App\Shopowner;
use Illuminate\Http\Request;
use App\Product;
use App\Category;
use Auth;
use Illuminate\Support\Facades\Validator;

class ShopownerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         $categories = Category::pluck('name','id');
        $shopOwnerProduct = Product::where(['shopownerid'=>Auth::user()->id])->get();
//        $shopOwnerProduct = Product::all();
        $shopowner = Auth::user()->id;
        return view('shopowners.index',compact('categories','shopOwnerProduct'));
    }
    public function setupStore(Request $request){
//
//        upload
        $brand = $request->file('brandphoto');
        $brandname ="shopowner".time().$brand->getClientOriginalName();
        $destination = "uploads/shopowner";
        $brand->move($destination,$brandname);
        $brandlink = $destination."/".$brandname;

        $shop = new Shopowner();
        $shop->userid = Auth::user()->id;
        $shop->name = $request->get('name');
        $shop->brandphoto = $brandlink;
        $shop->address = $request->get('address');
        $shop->url = $request->get('url');
        if($shop->save()){
            return redirect()->route('home')->with('success','Your Shop is Set Up Successful');
        }else{
            return back();
        }
    }
    public function ownerAddProduct(Request $request){
//        dd($request);
        $validate = Validator::make($request->all(),['price'=>'required','producturl'=>'required']);
        if($validate->fails()){
            return back()->with('message','Price and Product link are required');
        }
        $product = Product::where(['id'=>$request->get('productid')])->first();

        $product->shopownerid = Auth::user()->id;
        $product->price = $request->get('price');
        $product->dealprice = $request->get('dealprice');
        $product->dealexpire = $request->get('dealexpire');
        $product->producturl = $request->get('producturl');
        if($product->save()){
            return redirect()->route('shopowners.index')->with('success','product add successfully');
        }else{
            return back()->withInput($request->all());
        }
    }


    public function ownerProductIndex(){
        $categories = Category::pluck('name','id');
        $shopOwnerProduct = Product::where(['shopownerid'=>Auth::user()->id]);
        $shoponwer = Auth::user()->id;
        return view('products.owneradd',compact('categories','shopOwnerProduct','shoponwer'));
    }
//    load product through ajax to a dropdown
    public function loadproducts($id){
        $productall = Product::where(['categoryid'=>$id])->pluck("name","id");
//        foreach ($productall as $value) {
//            $product = explode(',',$value);
//        }
//        dd($productall);
//        return view('shopowners.index');
        return json_encode($productall);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Shopowner  $shopowner
     * @return \Illuminate\Http\Response
     */
    public function show(Shopowner $shopowner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Shopowner  $shopowner
     * @return \Illuminate\Http\Response
     */
    public function edit(Shopowner $shopowner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Shopowner  $shopowner
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Shopowner $shopowner)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Shopowner  $shopowner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shopowner $shopowner)
    {
        //
    }
}
