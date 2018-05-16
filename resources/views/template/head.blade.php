<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title')</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('css/master.css')}}" rel="stylesheet">
    <!-- Favicon -->
    <link rel="shortcut icon" href="favicon.png">
    <!-- /Favicon -->

    <!-- Styles -->
    <link rel="stylesheet" href="{{asset('datatable/datatables.min.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('assets/components/bootstrap-3.3.7-dist/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/jquery-ui-1.12.1/jquery-ui.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/font-awesome/css/font-awesome.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/elegant-font/style.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/themify-icons/themify-icons.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/owl-carousel/assets/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/owl-carousel/assets/owl.theme.default.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/magnific-popup-master/dist/magnific-popup.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/malihu-custom-scrollbar/jquery.mCustomScrollbar.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/components/jqvmap/dist/jqvmap.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/css/theme.css')}}">
    <!-- /Styles -->
    <script src="{{asset('assets/js/jquery-2.2.0.min.js')}}"></script>
</head>
<body class="sidebar-expanded">
<!-- Preloader -->
<div class="preloader loader"></div>
<!-- /Preloader -->
