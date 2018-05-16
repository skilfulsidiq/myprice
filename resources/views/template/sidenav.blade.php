<div class="sidebar custom-scrollbar">
    <div class="sidebar-content">

        <!-- Sidebar search -->
   
        <!-- /Sidebar search -->

        <!-- Navigation -->
        <ul class="sidebar-navigation sb-nav">


           
            @if(Auth::user()->roleid == 1)
                <li class="sb-dropdown">
                    <a href="{{route('admin')}}" class="sb-nav-item ">
                        <i class="icon fa fa-home"></i>
                        <span>Dashboard</span>
                    </a>

                </li>
            <li class="sb-nav-item">
                <a href="{{route('product.index')}}" class="sb-nav-item">
                    <i class="icon fa fa-leaf"></i>
                    <span>Products</span>
                </a>
            </li>
            <li>
                <a href="{{route('category.index')}}" class="sb-nav-item">
                    <i class="icon fa fa-square"></i>
                    <span>Category</span>
                </a>
            </li>
            
            @else
                <!-- {{--shop owner menu--}} -->
            <li>
                <li class="sb-dropdown">
                    <a href="{{route('home')}}" class="sb-nav-item ">
                        <i class="icon fa fa-home"></i>
                        <span>Dashboard</span>
                    </a>

                </li>
            <li>
                <a href="{{route('shopowners.index')}}" class="sb-nav-item">
                    <i class="icon fa fa-square"></i>
                    <span>Product</span>
                </a>
            </li>
                    <li>
                        <a href="{{route('shopowners.index')}}" class="sb-nav-item">
                            <i class="icon fa fa-square"></i>
                            <span>Branch</span>
                        </a>
                    </li>
            @endif



        <!-- /Summary information -->

    </div>
</div>
