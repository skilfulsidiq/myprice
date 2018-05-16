
{{--/**--}}
 {{--* Created by PhpStorm.--}}
 {{--* User: Skilfulsidiq--}}
 {{--* Date: 5/10/2018--}}
 {{--* Time: 5:17 PM--}}
 {{--*/--}}
@extends('layouts.master)
@section('title','MyPrice|Category')
@section('page_heading')
    <ol class="breadcrumb">
        <li>
            <i class="icon fa fa-home"></i>
            <a href="{{route('home')}}">Home</a>
        </li>
        <li><a href="{{route('category.create')}}">category</a></li>
        <li class="active"><span>Add category</span></li>
        <li class="pull-right"><a href="{{route('category.index')}}">View Categories</a>  </li>
    </ol>
@stop
@section('content')


    @endsection