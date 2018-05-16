<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();



Route::get('/home', 'HomeController@index')->name('home');
Route::get('admin', 'AdminController@index')->name('admin');

//Route::get('product','ProductController@index')->name('product.index');
//Route::get('product/create','ProductController@create')->name('product.create');
//SHOPOWNER  FUNCTIONALITIES ROUTES
Route::get('shopowners','ShopOwnerController@index')->name('shopowners.index');//shopowner index page
Route::post('shopowners/shopowner','ShopOwnerController@ownerAddProduct')->name('ownerstore.addProduct');//add product
Route::post('shopowner/setupStore','ShopOwnerController@setupStore')->name('shopownwer.setupstore');//setup store for shop
Route::get('shopowners/loadproduct/{id}','ShopOwnerController@loadproducts')->name('shopowner.loadproduct'); //product ajax via categoryid
Route::get('shopowner/edit','ShopOwnerController@edit')->name('shopowner.edit');







Route::group(['prefix'=>'admin','namespace'=>'admin','middleware'=>'admin'], function(){
//    product
    Route::get('product','ProductController@index')->name('product.index');
    Route::post('product', 'ProductController@store')->name('product.store');
    //category
    Route::get('category','CategoryController@index')->name('category.index');
    Route::get('category/create','CategoryController@create')->name('category.create');
    Route::post('category', 'CategoryController@store')->name('category.store');
});