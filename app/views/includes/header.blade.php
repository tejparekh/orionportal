		<div class="navbar navbar-default" id="navbar">

			<div class="navbar-container" id="navbar-container">
				<div class="navbar-header pull-left">
					<a href="{{URL('/')}}" class="navbar-brand">
						<img class="logo" src="assets/images/Logo.png" style="max-height: 44px;"/>
					</a><!-- /.brand -->
				</div><!-- /.navbar-header -->
				<div class="navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">
						<li class="light-blue">
							<a data-toggle="dropdown" href="/dashboard" class="dropdown-toggle">
								<img class="nav-user-photo" src="{{Session::get('userphoto')}}" alt="User's Photo" />
								<span class="user-info">
									<small>Welcome,</small>
									{{ Session::get('username')}}
								</span>

								<i class="icon-caret-down"></i>
							</a>

							<ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-closer">
								<li>
									<a href="{{URL('/editprofile')}}">
										<i class="icon-cog"></i>
										My Account
									</a>
								</li>
								<li>
									<a href="{{URL('/support')}}" target="_blank">
										<i class="icon-flag"></i>
										Help & Support
									</a>
								</li>
								<li class="divider"></li>

								<li>
									<a href="{{URL::to('/logout')}}">
										<i class="icon-off"></i>
										Logout
									</a>
								</li>
							</ul>
						</li>
					</ul><!-- /.ace-nav -->
				</div><!-- /.navbar-header -->
				
			
		</div>
		<div class="col-sm-12 ">
				
				
				</div>
			</div><!-- /.container -->

		
				

					
				
