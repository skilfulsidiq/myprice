@extends('layouts.master')
@section('title', 'MyPrice|Product')
@section('page_heading')
    <ol class="breadcrumb">
        <li>
            <i class="icon fa fa-home"></i>
            <a href="{{route('home')}}">Home</a>
        </li>
        <li><a href="{{route('product.index')}}">Product</a></li>
        <li class="active"><span>View All Products</span></li>
        {{--<li class="pull-right"><a href="{{route('product.create')}}">Add Product</a>  </li>--}}
    </ol>
@stop
@section('content')
{{--create product--}}
    <div class="panel panel-white ">
        <div class="panel-heading">
            <div class="panel-title text-center">Create Product</div>
        </div>
        <div class="panel-body pb">
            <form action="{{route('product.store')}}" method="post" enctype="multipart/form-data">
                {{csrf_field()}}
                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Product Name" value="" class="form-control" >
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <select name="categoryid" class="form-control">
                                <option>Select Category</option>
                                @foreach($categories as $category)
                                    <option value="{{$category->id}}">{{$category->name}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="from-group">
                            <input type="file" name="productimage" placeholder="Product Image" value="" class="form-control">
                        </div>
                    </div>
                    {{--<div class="col-xs-12 col-md-4">--}}
                    {{--<div class="from-group">--}}
                    {{--<input type="text" name="price" placeholder="Price" value="" class="form-control">--}}
                    {{--</div>--}}
                    {{--</div>--}}
                </div>
                <div class="row">
                    {{--<div class="col-xs-12 col-md-6 ">--}}
                    {{--<div class="form-group">--}}
                    {{--<textarea name="producturl" value="" cols="8" rows="3" placeholder="Product Link" class="form-control"></textarea>--}}
                    {{--</div>--}}
                    {{--</div>--}}
                </div>
                <div class="row">
                    <div class="col-xs-12 col-md-6 col-md-offset-3">
                        <div class="form-group">
                            <input type="submit" value="Add Product" class="btn btn-success form-control">
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>

    <div class="panel panel-white ">
        <div class="panel-heading">
            <div class="panel-title text-center">Products</div>
        </div>
        <div class="panel-body pb">
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-condensed" id="table">
                    <thead>
                    <th>S/n</th><th>Name</th><th>Category</th><th>Price</th><th>Shop</th><th>Image</th><th>Link</th>   <th>Date Created</th>
                    </thead>
                    <tbody>
                    @foreach($products as $product)
                        <tr>
                            <td>{{$loop->iteration}}</td>
                            <td>{{@$product->name}}</td>
                            <td>{{@$product->category->name}}</td>
                            <td>&#8358;{{$product->price}}</td>
                            <td>{{@$product->shopowner->name}}</td>
                            <td><img src="{{asset($product->productimage)}}" style="width:60px;height: 40px;"></td>
                            <td><a href=" {{$product->producturl}}">Link</a></td>
                            <td>{{$product->created_at}}</td>
                        </tr>
                    @endforeach
                    </tbody>

                </table>
            </div>
        </div>
    </div>

@endsection