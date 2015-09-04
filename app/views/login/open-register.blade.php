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
												<i class="icon-key green"></i>
												Choose the registration type.
											</h4>

											<div class="choose-roles">
												<button href="#login" id="open_producer_login" class="btn btn-primary">Producer </button>
												<button href="#login-subscriber" id="open_sub_login" class="btn btn-danger" >Subscriber</button>
											</div>
											
											<p></p>
											<div id="login" class="login" align="center" style="display:none;">
												{{ Form::open(array('url'=>'/do-open-register','method'=>'POST', 'id' => 'open-register-form' )) }}
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
													<h4 class="header blue lighter bigger" align="center">
														Register as <strong> Producer</strong>
													</h4>
													<div class="row">

													<input type="hidden" name="roles" value="2">
														  <div class="col-md-12">
															  <p>{{Form::label('first_name', 'First Name*', array('class'=>'block clearfix'))}}
															  </div>
															  <div class="col-md-9">
															  <p>{{Form::text('first_name',Input::old('first_name'))}}
														  </div>
															</div>
															<div class="row">
																  <div class="col-md-12">
																 	<p>{{Form::label('last_name', 'Last Name*', array('class'=>'block clearfix'))}}
																  </div>
																  <div class="col-md-9">
																	<p>{{Form::text('last_name',Input::old('last_name'))}}
																  </div>
														</div>
														<div class="row">
																  <div class="col-md-12">
																 	<p>{{Form::label('username', 'Username (Email)*', array('class'=>'block clearfix'))}}
																  </div>
																  <div class="col-md-9">
																	<p>{{Form::text('username',Input::old('username'))}}
																  </div>
														</div>
														<div class="row">
																  <div class="col-md-12">
																 	<p>{{Form::label('contact_num', 'Mobile No. for OTP*', array('class'=>'block clearfix'))}}
																  </div>
																  <div class="col-md-9">
																	<p>{{Form::text('contact_num',Input::old('contact_num'))}}
																  </div>
														</div>
														<div class="row">
																  <div class="col-md-12">
																 	<p>{{Form::label('mail_id', 'Mail ID*', array('class'=>'block clearfix'))}}
																  </div>
																  <div class="col-md-9">
																	<p>{{Form::text('mail_id',Input::old('mail_id'))}}
																  </div>
														</div>

													</div>
													
													<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
													<p></p>
													<div class="row">
																 <div class="col-md-2"></div>
																  <div class="col-md-8">
																	{{ Form::submit('REGISTER', array('class' => 'btn btn-inverse btn-login')) }}
																  </div>
																 <div class="col-md-2"></div>

														</div>
							
											{{ Form::close() }}
												</div>
												
												<div id="login-subscriber" class="login" align="center" style="display:none;">
												{{ Form::open(array('url'=>'/do-open-register-subscriber','method'=>'POST', 'id' => 'open-register-form-subscriber' )) }}
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
													<h4 class="header blue lighter bigger" align="center">
														Register as <strong>Subscriber</strong>
													</h4>
													<div class="row">
													<input type="hidden" name="roles" value="3">
														  <div class="col-md-12">
															  <p>{{Form::label('first_name', 'First Name*', array('class'=>'block clearfix'))}}
															  </div>
															  <div class="col-md-9">
															  <p>{{Form::text('first_name',Input::old('first_name'))}}
														  </div>
															</div>
															<div class="row">
																  <div class="col-md-12">
																 	<p>{{Form::label('last_name', 'Last Name*', array('class'=>'block clearfix'))}}
																  </div>
																  <div class="col-md-9">
																	<p>{{Form::text('last_name',Input::old('last_name'))}}
																  </div>
														</div>
														<div class="row">
																  <div class="col-md-12">
																 	<p>{{Form::label('username', 'Username (Email)*', array('class'=>'block clearfix'))}}
																  </div>
																  <div class="col-md-9">
																	<p>{{Form::text('username',Input::old('username'))}}
																  </div>
														</div>


													</div>
													
													<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
													<p></p>

													<div class="row">
																 <div class="col-md-2"></div>
																  <div class="col-md-8">
																	{{ Form::submit('REGISTER', array('class' => 'btn btn-inverse btn-login')) }}
																  </div>
																 <div class="col-md-2"></div>

														</div>
							
											{{ Form::close() }}
												</div>


													</div>
													<div class="toolbar clearfix">
															<div>
																<a class="forgot-password-link" href="{{URL('/forgotpassword')}}" >
																	<i class="icon-arrow-left"></i>
																	I forgot my password
																</a>
															</div>

															<div>
																<a class="forgot-password-link" href="{{URL('/')}}" >
																	I want to Login
																	<i class="icon-arrow-right"></i>
																</a>
															</div>
														</div>

												</div><!-- /widget-body -->
												<h4 class="white" align="center">&copy; Orion Portal</h4>
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


		<script src="assets/js/bootstrap.min.js"></script>
		<script src="assets/js/typeahead-bs2.min.js"></script>

		<!-- page specific plugin scripts -->

		<script type="text/javascript">
		$('#open_producer_login').on("click",function  () {
		 $('#login').show();
		 $('#login-subscriber').hide();
		});
		$('#open_sub_login').on("click",function  () {
		 $('#login').hide();
		 $('#login-subscriber').show();
		})
		</script>


@stop