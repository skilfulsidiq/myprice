{{--/**--}}
{{--* Created by PhpStorm.--}}
{{--* User: Skilfulsidiq--}}
{{--* Date: 5/10/2018--}}
{{--* Time: 12:32 PM--}}
{{--*/--}}
@if ($errors->any())
    <div style="width: 50%; margin: 10px auto; padding:10px; background-color: red;color: #fff;">  {{ implode('', $errors->all(':message')) }}</div>
@endif