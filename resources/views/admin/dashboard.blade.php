
{{--/**--}}
 {{--* Created by PhpStorm.--}}
 {{--* User: Skilfulsidiq--}}
 {{--* Date: 5/11/2018--}}
 {{--* Time: 2:39 PM--}}
 {{--*/--}}
@extends('layouts.master')
@section('title', 'MyPrice| admin')
@section('page_heading')
    <ol class="breadcrumb">
        <li>
            <i class="icon fa fa-home"></i>
            <a href="{{route('admin')}}">Home</a>
        </li>
        <li><a href="{{route('admin')}}">Dashboard</a></li>
        {{--<li class="active"><span>View All Products</span></li>--}}
        {{--<li class="pull-right"><a href="{{route('product.create')}}">Add Product</a>  </li>--}}
    </ol>
@stop
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Dashboard</div>

                    <div class="panel-body">
                        @if (session('status'))
                            <div class="alert alert-success">
                                {{ session('status') }}
                            </div>
                        @endif

                        You are logged in!
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection