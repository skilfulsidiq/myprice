@extends("layouts.master")
@section('page_heading')
    <ol class="breadcrumb">
        <li>
            <i class="icon fa fa-home"></i>
            <a href="{{route('home')}}">Home</a>
        </li>
        <li><a href="{{route('product.index')}}">Product</a></li>
        <li class="active"><span>Add Product</span></li>
        <li class="pull-right"><a href="{{route('product.index')}}">View Products</a>  </li>
    </ol>
@stop
@section("content")
    {{--create form--}}
    <div class="panel panel-white ">
        <div class="panel-heading">
            <div class="panel-title text-center">Add Product</div>
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
                            <input type="text" name="price" placeholder="Price" value="" class="form-control">
                        </div>
                    </div>
                </div>
                    <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <div class="from-group">
                            <input type="file" name="productimage" placeholder="Product Image" value="" class="form-control">
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6 ">
                        <div class="form-group">
                        <textarea name="producturl" value="" cols="8" rows="3" placeholder="Product Link" class="form-control"></textarea>
                        </div>
                    </div>
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

    @endsection