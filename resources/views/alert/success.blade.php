{{--/**--}}
 {{--* Created by PhpStorm.--}}
 {{--* User: Skilfulsidiq--}}
 {{--* Date: 5/10/2018--}}
 {{--* Time: 12:32 PM--}}
 {{--*/--}}
@if(session()->has('success'))
    <div class="row">
        <div style="width: 50%; margin: 10px auto; padding:10px; background-color: green;color: #fff;">{{ session()->get('success')}}</div>

    </div>

@endif
@if(Session::has('message'))
    <div style="width: 50%; margin: 10px auto; padding:10px; background-color: blue;color: #fff;">
    {{ Session::get('alert-class', 'alert-info') }}">{{ Session::get('message') }}
    </div>
@endif