@extends('layouts.login')
@section('content')

<!-- Login Page for User -->		
<div class="main-container login-layout ">
			<div class="main-content">
				<div class="row">
					<div class="col-sm-12">
						<div class="login-container">
							<div class="center">
								<h1>
									<a href="{{URL('/')}}"><img src='assets/images/Logo.png' height="150px" /></a> 
								</h1>
								
							</div>


							<div class="position-relative">
								<div id="login-box" class="login-box visible widget-box">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header blue lighter bigger" align="center">
												<i class="icon-coffee green"></i>
												Please Enter Your Credentials to Login
											</h4>

											<div class="space-6"></div>

											<div id="login" class="login" align="center">
												{{ Form::open(array('url'=>'/authenticate','method'=>'POST')) }}

													@if ($errors->has('username'))
														<div class="alert alert-error" style="color:red;">{{ $errors->first('username', ':message') }}</div>
													@endif
													@if ($errors->has('password'))
														<div class="alert alert-error" style="color:red;">{{ $errors->first('password', ':message') }}</div>
													@endif
													@if (Session::get('error'))
													<div class="alert alert-danger">
																<button type="button" class="close" data-dismiss="alert">
																	<i class="icon-remove"></i>
																</button>
																<p>&nbsp; &nbsp;<strong>{{ Session::get('error') }}</strong>
																</p>
													</div>
													@endif
													@if (Session::get('message'))
													<div class="alert alert-block alert-success">
																<button type="button" class="close" data-dismiss="alert">
																	<i class="icon-remove"></i>
																</button>
																<p>&nbsp; &nbsp;<strong>{{ Session::get('message') }}</strong>
																</p>
													</div>
														<!-- <div class="alert alert-error" style="color:red;">{{ Session::get('message') }}</div> -->
													@endif
													<div class="control-group">
													<div class="row" style="margin-bottom:0.5em">
													<div class="col-lg-1">
													</div>
													<div class="col-lg-4" style="text-align:center;">
														{{ Form::label('Username', 'Username',array('class'=>'lbl bigger')) }}
													</div>
													<div class="col-lg-5">
														<div class="controls">
															{{ Form::text('username') }}
														</div>
													</div>
													<div class="col-lg-1">
													</div>
													</div>
													</div>
													<div class="control-group">
													<div class="row" style="margin-bottom:0.5em">
													<div class="col-lg-1">
													</div>
													<div class="col-lg-4">
														{{ Form::label('password', 'Password',array('class'=>'lbl bigger')) }}
														</div>
														<div class="col-lg-5">
														<div class="controls">
															{{ Form::password('password') }}
														</div>
														</div>
														<div class="col-lg-1">
													</div>
													</div>
													</div>
													<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
													<div class="form-actions" style="background:none;border:none;">
														{{ Form::submit('Login', array('class' => 'btn btn-inverse btn-login')) }}
													<a href="{{URL('/forgotpassword')}}"><h4>Forgot Password?</h4></a>

													</div>
											{{ Form::close() }}
												</div>
												<h4 class="blue" align="center">&copy; Orion Portal</h4>
													</div>
												</div><!-- /widget-body -->
											</div><!-- /login-box -->
										</div><!-- /position-relative -->
									</div>
								</div><!-- /.col -->
							</div><!-- /.row -->
						</div>
					</div><!-- /.main-container -->
				<!-- PAGE CONTENT ENDS -->
	
			</div><!-- /.main-container-inner -->
		</div><!-- /.main-container -->

		<!-- basic scripts -->

	
		<script type="text/javascript">
			window.jQuery || document.write("<script src='assets/js/jquery-2.0.3.min.js'>"+"<"+"/script>");
		</script>
		<script type="text/javascript">
			if("ontouchend" in document) document.write("<script src='assets/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="assets/js/bootstrap.min.js"></script>
		<script src="assets/js/typeahead-bs2.min.js"></script>

		<!-- page specific plugin scripts -->

		<!-- ace scripts -->

		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>
		<!-- inline scripts related to this page -->
@stop