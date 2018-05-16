
{{--/**--}}
 {{--* Created by PhpStorm.--}}
 {{--* User: Skilfulsidiq--}}
 {{--* Date: 5/10/2018--}}
 {{--* Time: 5:17 PM--}}
 {{--*/--}}
@extends('layouts.master')
@section('title','MyPrice|Category')
@section('page_heading')
    <ol class="breadcrumb">
        <li>
            <i class="icon fa fa-home"></i>
            <a href="{{route('home')}}">Home</a>
        </li>
        <li><a href="{{route('category.index')}}">category</a></li>
        <li class="active"><span>View All category</span></li>
        <li class="pull-right"><a href="{{route('category.create')}}">Add Category</a>  </li>
    </ol>
@stop
@section('content')
    <div class="panel panel-white ">
        <div class="row">
            <div class="col-xs-12 col-md-6" style="border-right: 1px solid #5e5e5e">
                <div class="panel-heading">
                    <div class="panel-title text-center"> Add Category</div>
                </div>
                <div class="panel-body pb">
                    <form action="{{route('category.store')}}" method="post">
                        {{csrf_field()}}
                        <div class="col-xs-12 col-md-8 col-md-offset-2">
                            <div class="form-group">
                                <input type="text" name="name" placeholder="Name" value="" class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="submit" value="Add category" class="btn btn-success form-control">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-xs-12 col-md-6">
                <div class="panel-heading">
                    <div class="panel-title text-center">Categories</div>
                </div>
                <div class="panel-body pb">
                    <div class="table-responsive">
                        <table class="table table-bordered table-striped table-condensed" id="table">
                            <thead>
                            <th>S/n</th><th>Name</th><th>Date Created</th>
                            </thead>
                            <tbody>
                            @foreach($categories as $category)
                                <tr>
                                    <td>{{$loop->iteration}}</td>
                                    <td>{{$category->name}}</td>
                                    <td>{{$category->created_at}}</td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection