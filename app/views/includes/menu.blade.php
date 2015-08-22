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


	<li>
		<a href="" class="dropdown-toggle">
			<i class="icon-list-alt"></i>
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

	
</ul><!-- /.nav-list -->	
