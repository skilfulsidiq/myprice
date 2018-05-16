
{{--/**--}}
 {{--* Created by PhpStorm.--}}
 {{--* User: Skilfulsidiq--}}
 {{--* Date: 5/11/2018--}}
 {{--* Time: 6:20 PM--}}
 {{--*/--}}

<!--/**-->
<!-- * Created by PhpStorm.-->
<!-- * User: Skilfulsidiq-->
<!-- * Date: 5/11/2018-->
<!-- * Time: 1:26 PM-->
<!-- */-->
@extends('layouts.master')
@section('title', 'MyPrice|Product')
@section('page_heading')
    <ol class="breadcrumb">
        <li>
            <i class="icon fa fa-home"></i>
            <a href="{{route('home')}}">Home</a>
        </li>
        <li><a href="{{route('product.index')}}"> Add Product</a></li>
        <li class="active"><span>View All Products</span></li>
        {{--<li class="pull-right"><a href="{{route('product.create')}}">Add Product</a>  </li>--}}
    </ol>
@stop
@section('content')
    <div class="panel panel-white ">
        <div class="panel-heading">
            <div class="panel-title text-center">Add Product</div>
        </div>
        <div class="panel-body pb">
            <form action="{{route('ownerstore.addProduct')}}" method="post" enctype="multipart/form-data">
                {{csrf_field()}}
                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label>Product category</label>
                            <select name="categoryid" class="form-control">
                                <option>Select Category</option>
                                @foreach($categories as $key =>$category)
                                    <option value="{{$key}}">{{$category}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label>Product</label>
                            <select name="productid" class="form-control">
                                <option>Select Product</option>

                            </select>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label>Product Price </label>
                            <input type="text" name="price" class="form-control" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label>Deal Price </label>
                            <input type="text" name="dealprice" class="form-control" />
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label>Deal Expire Date </label>
                            <input type="date" name="dealexpire" class="form-control" />
                        </div>
                    </div> <div class="col-xs-12 col-md-4">
                        <div class="form-group">
                            <label>Product Page Link</label>
                            <textarea  name="producturl" class="form-control" cols="5"></textarea>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12 col-md-6 col-md-offset-3">
                        <div class="form-group">
                            <input type="submit" name="submit" value="Add Product" class="btn btn-success form-control">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    {{--view product--}}
    <div class="panel panel-white ">
        <div class="panel-heading">
            <div class="panel-title text-center">My Products</div>
        </div>
        <div class="panel-body pb">
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-condensed" id="table">
                    <thead>
                    <th>S/n</th><th>Name</th><th>Category</th><th>Price</th><th>Image</th><th>Link</th>
                    </thead>
                    <tbody>
                    @foreach($shopOwnerProduct as $product)
                        <tr>
                            <td>{{$loop->iteration}}</td>
                            <td>{{@$product->name}}</td>
                            <td>{{@$product->category->name}}</td>
                            <td>&#8358;{{$product->price}}</td>
                            <td><img src="{{asset($product->productimage)}}" style="width:60px;height: 40px;"></td>
                            <td><a href=" {{$product->producturl}}">Link</a></td>
                        </tr>
                    @endforeach
                    </tbody>

                </table>
            </div>
        </div>
    </div>
    {{--script--}}
    <script>
        $(document).ready(function(){
            $('select[name="categoryid"]').on('change',function(){
                var category = $(this).val();
                if(category){
                    $.ajax({
                        url: 'shopowners/loadproduct/' + category,
                        type: "GET",
                        dataType: "json",
                        success:function(data){
                            $('select[name="productid"]').empty();
                            console.log(data);
                            $.each(data, function(key,value) {
                                $('select[name="productid"]').append('<option value="' + key + '">' + value + '</option>');
                            });
                        }
                    });
                }
            });
        });
    </script>
@endsection