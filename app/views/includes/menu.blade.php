<!-- Menu List for the Organisation Admin -->
<ul class="nav nav-list">
	<li>
		<a href="{{URL('/dashboard')}}">
			<i class="icon-home home-icon"></i>
			<span class="menu-text"> Home </span>
		</a>
	</li>
</ul>
<ul class="nav nav-list">
@if( Session::get('ROLE') == "Orion Super Admin" || Session::get('ROLE') == "Administrator" )
	<li>
		<a href="" class="dropdown-toggle">
			<i class="icon-list-alt"></i>
			<span class="menu-text"> Producers </span>
			<b class="arrow icon-angle-down"></b>
		</a>
		<ul class="submenu">
			<li>
				<a href="{{URL('/producers-list')}}">
					<i class="icon-double-angle-right"></i>
					Manage Producers
				</a>
			</li>
			
		</ul>
	</li>
	@endif

@if( Session::get('ROLE') !== "Subscriber" && Session::get('ROLE') !== "Producer" )
	<li>
		<a href="" class="dropdown-toggle">
			<i class="icon-list-alt"></i>
			<span class="menu-text"> Subscribers </span>
			<b class="arrow icon-angle-down"></b>
		</a>
		<ul class="submenu">
			<li>
				<a href="{{URL('/register-subscriber')}}">
					<i class="icon-double-angle-right"></i>
					Add new Subsciber
				</a>
			</li>
			<li>
				<a href="{{URL('/subscribers-list')}}">
					<i class="icon-double-angle-right"></i>
					Manage Subscribers
				</a>
			</li>
			
		</ul>
	</li>
	@endif
	@if( Session::get('ROLE') === "Orion Super Admin" )
	<li>
		<a href="" class="dropdown-toggle">
			<i class="icon-desktop"></i>
			<span class="menu-text"> Devices </span>
			<b class="arrow icon-angle-down"></b>
		</a>
		<ul class="submenu">
			<li>
				<a href="{{URL('/register-device')}}">
					<i class="icon-double-angle-right"></i>
					Add new Device
				</a>
			</li>
			<li>
				<a href="{{URL('/devices-list')}}">
					<i class="icon-double-angle-right"></i>
					Manage Devices
				</a>
			</li>
			
		</ul>
	</li>
	@endif
	@if( Session::get('ROLE') === "Producer" )
	<li>
		<a href="" class="dropdown-toggle">
			<i class="icon-list-alt"></i>
			<span class="menu-text"> Producer </span>
			<b class="arrow icon-angle-down"></b>
		</a>
		<ul class="submenu">
			<li>
				<a href="{{URL('/producer-details')}}">
					<i class="icon-double-angle-right"></i>
					Registration Details
				</a>
			</li>
			<li>
				<a href="{{URL('/add-movies')}}">
					<i class="icon-double-angle-right"></i>
					Add Movies/Content
				</a>
			</li>
			<li>
				<a href="{{URL('/view-movies')}}">
					<i class="icon-double-angle-right"></i>
					Edit Movies/Content
				</a>
			</li>
			
		</ul>
	</li>
	@endif
	
	@if( Session::get('ROLE') !== "Subscriber" && Session::get('ROLE') !== "Producer" )
	<li>
		<a href="" class="dropdown-toggle">
			<i class="icon-film"></i>
			<span class="menu-text"> Movies </span>
			<b class="arrow icon-angle-down"></b>
		</a>
		<ul class="submenu">
			<li>
				<a href="{{URL('/movies-list')}}">
					<i class="icon-double-angle-right"></i>
					Movies List
				</a>
			</li>
		</ul>
	</li>
	@endif

</ul><!-- /.nav-list -->	
