
<header class="header">


    <!-- Top line -->
    <div class="top-line">

        <!-- Brand -->
        <a href="#" class="brand">

            <!-- Big -->
            <div class="brand-big">
                <span class="strong">Myprice</span>
            </div>
            <!-- /Big -->

            <!-- Small -->
            <div class="brand-small">
                Myprice
            </div>
            <!-- /Small -->

        </a>
        <!-- /Brand -->

        <!-- Menu button -->

                <div class="menu-button">
                    <a href="#" class="sidebar-toggle menu-toggle open">
                        <div class="menu-icon">
                            <span></span><span></span><span></span>
                            <span></span><span></span><span></span>
                        </div>
                    </a>
                </div>

        <!-- /Menu button -->

        <!-- Navigation -->
        <div class="navigation-top">

            <!-- Navigation left -->
         <!--    {{--<ul class="navbar-top">--}}

                {{--<li class="dropdown">--}}
                    {{--<a href="#" class="dropdown-toggle" data-toggle="dropdown">--}}
                        {{--<i class="icon icon-left ti-file"></i>--}}
                        {{--<span class="navbar-top-title">Create</span> <i class="caret"></i>--}}
                    {{--</a>--}}
                    {{--<ul class="dropdown-menu">--}}
                        {{--<li><a href="#">Publication</a></li>--}}
                        {{--<li><a href="#">Project</a></li>--}}
                        {{--<li><a href="#">Task item</a></li>--}}
                    {{--</ul>--}}
                {{--</li>--}}

                {{--<li>--}}
                    {{--<a href="#">--}}
                        {{--<i class="icon icon-left icon_cloud_alt"></i>--}}
                        {{--<span class="navbar-top-title">File explorer</span>--}}
                    {{--</a>--}}
                {{--</li>--}}

            {{--</ul>--}} -->
            <!-- /Navigation left -->


            <!-- Navigation right -->
            <ul class="navbar-top navbar-top-right">
                @guest
                    <li><a href="{{ route('login') }}">Login</a></li>
                    <li><a href="{{ route('register') }}">Register</a></li>
                @else
                <!-- Notifications -->
                <li class="dropdown">

                    <!-- Profile avatar -->
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="icon icon-left fa fa-bell-o"></i>
                        <!--<span class="navbar-top-title">Notifications</span>-->
                        <span class="badge badge-danger">3</span>
                    </a>
                    <!-- /Profile avatar -->

                    <!-- Dropdown menu -->
                    <ul class="dropdown-menu dropdown-menu-custom dropdown-menu-right dropdown-menu-notifications">
                        <li class="title">Notifications</li>
                        <li>

                            <!-- Notification item -->
                            <a href="#" class="notification-item">

                                <!-- Avatar -->
                                <div class="image avatar">
                                    <img src="images/avatar-m-01.jpg" alt="">
                                </div>
                                <!-- /Avatar -->

                                <!-- Notification body -->
                                <div class="notification-body">
                                    <span class="name">Phillip Sandoval</span> liked your post
                                    <span class="datetime">2 minutes ago</span>
                                    <span class="state-dot state-dot-online"></span>
                                </div>
                                <!-- /Notification body -->

                            </a>
                            <!-- /Notification item -->

                        </li>
                        <li>

                            <!-- Notification item -->
                            <a href="#" class="notification-item">

                                <!-- Avatar -->
                                <div class="image avatar">
                                    <img src="images/avatar-f-05.jpg" alt="">
                                </div>
                                <!-- /Avatar -->

                                <!-- Notification body -->
                                <div class="notification-body">
                                    <span class="name">Mary Riley</span> delegated case
                                    <span class="datetime">4 hours ago</span>
                                    <span class="state-dot state-dot-online"></span>
                                </div>
                                <!-- /Notification body -->

                            </a>
                            <!-- /Notification item -->

                        </li>
                        <li>

                            <!-- Notification item -->
                            <a href="#" class="notification-item">

                                <!-- Avatar -->
                                <div class="image avatar">
                                    <img src="images/avatar-f-01.jpg" alt="">
                                </div>
                                <!-- /Avatar -->

                                <!-- Notification body -->
                                <div class="notification-body">
                                    <span class="name">Debra Burton</span> commented your post
                                    <span class="datetime">4 hours ago</span>
                                    <span class="state-dot state-dot-online"></span>
                                </div>
                                <!-- /Notification body -->

                            </a>
                            <!-- /Notification item -->

                        </li>
                        <li>

                            <!-- Notification item -->
                            <a href="#" class="notification-item">

                                <!-- Avatar -->
                                <div class="image avatar">
                                    <img src="images/avatar-m-02.jpg" alt="">
                                </div>
                                <!-- /Avatar -->

                                <!-- Notification body -->
                                <div class="notification-body">
                                    <span class="name">Nathan Nelson</span> followed you
                                    <span class="datetime">4 hours ago</span>
                                    <span class="state-dot state-dot-online"></span>
                                </div>
                                <!-- /Notification body -->

                            </a>
                            <!-- /Notification item -->

                        </li>
                        <li class="footer">
                            <a href="#">See all notifications</a>
                        </li>
                    </ul>
                    <!-- /Dropdown menu -->

                </li>
                <!-- /Notifications -->

                <!-- Language -->
                {{--<li class="dropdown">--}}

                    {{--<!-- Profile avatar -->--}}
                    {{--<a href="#" class="dropdown-toggle" data-toggle="dropdown">--}}
                        {{--EN <i class="caret"></i>--}}
                    {{--</a>--}}
                    {{--<!-- /Profile avatar -->--}}

                    {{--<!-- Profile dropdown menu -->--}}
                    {{--<ul class="dropdown-menu dropdown-menu-right">--}}
                        {{--<li><a href="#">English</a></li>--}}
                        {{--<li><a href="#">Deutsch</a></li>--}}
                        {{--<li><a href="#">France</a></li>--}}
                    {{--</ul>--}}
                    {{--<!-- /Profile dropdown menu -->--}}

                {{--</li>--}}
                <!-- /Language -->

                <!-- Profile -->
                <li class="dropdown">

                    <!-- Profile avatar -->
                    <a href="#" class="dropdown-toggle nav-profile" data-toggle="dropdown">
                        <span class="profile-name">{{Auth::user()->name}}</span>
                        <span class="caret"></span>
                        <div class="profile-avatar">
                            <div class="profile-avatar-image">
                                <img src="images/avatar-f-05.jpg" alt="">
                            </div>
                        </div>
                    </a>
                    <!-- /Profile avatar -->

                    <!-- Profile dropdown menu -->
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li><a href="#"><i class="icon icon-inline fa fa-address-card-o"></i> Profile</a></li>
                        <li><a href="#"><i class="icon icon-inline fa fa-tasks"></i> Tasks</a></li>
                        <li><a href="{{ route('logout') }}" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">

                                <i class="icon icon-inline fa fa-sign-out"></i> Sign out</a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                {{ csrf_field() }}
                            </form>
                        </li>
                    </ul>
                    <!-- /Profile dropdown menu -->

                </li>
                <!-- /Profile -->
                    @endguest

            </ul>
            <!-- /Navigation right -->

        </div>
        <!-- /Navigation -->


    </div>
    <!-- /Top line -->


    <!-- Sidebar -->
    @guest
        @else
@include('template/sidenav')
@endguest
    <!-- /Sidebar -->


</header>
