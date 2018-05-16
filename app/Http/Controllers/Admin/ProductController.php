<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Category;
use App\Product;
use Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $products = Product::get();
        $categories = Category::all();
        return view('products.index',compact('products','categories'));
    }



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        return view('products.create',compact('categories'));

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'name'=>'required',
            'categoryid'=>'required',
            'productimage'=>'required|image|max:2048']);

        // $image = $request->file('productimage');
        // $imagename = "product".time().$image->getClientOriginalname();
//        $extension = $image->getClientOriginalExtension();
//        $size = $image->getClientSize();
      

        $destinationPath = 'uploads';
        $image->move($destinationPath,$imagename);
        $imagelink = $destinationPath."/".$imagename;
        $product = new product();
          
          if ($request->file('productimage') != ''){
          Cloudder::upload($request->file('productimage'), null);
          $product->productimage = Cloudder::getResult()['url'];
            }
        $product->name = $request->get('name');
        $product->categoryid = $request->get('categoryid');
//        $product->shopownerid = $request->get('')
//        $product->price = $request->get('price');
//        dd($product);
//        $product->producturl = $request->get('producturl');
        if($product->save()){
            return redirect()->route('product.index')->with('success','product added successfully!');
        }else{
            return back()->withInput($request->all());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        //
    }
}
