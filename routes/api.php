<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login','Api\AuthController@login');
Route::post('register','Api\AuthController@register');
Route::get('getAllProduct','Api\OperationController@getAllProduct')->name('getAllProduct');//get all product
Route::get('getCategory','Api\OperationController@getCategory')->name('getCategory');
Route::get('getAProduct/{id}','Api\OperationController@getAProduct')->name('getAProduct');
Route::get('getThreeProducts','Api\OperationController@getThreeProducts')->name('getThreeProducts');
Route::get('getAllProductsFromACategory/{id}','Api\OperationController@getAllProductsFromACategory')->name('getAllProductsFromACategory');
Route::get('getThreeStorePrice/{price}','Api\OperationController@getThreeStorePrice')->name('getThreeStorePrice');