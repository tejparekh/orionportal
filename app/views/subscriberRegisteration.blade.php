@extends('layouts.default')
@section('content')

<!-- PAGE CONTENT BEGINS -->
@if (Auth::check())
	<div class="col-lg-12">
		{{Form::open(array('url'=>'addsubscriber', 'name'=>'subscriber-register-form','id'=>'subscriber-register-form','files'=>'true'))}}
			{{Form::hidden('roles','3')}}
				<div class="widget-box">
					<div class="widget-header">
					<h4>Subscriber Details</h4>
					<div class="widget-toolbar">
						<a href="#" data-action="collapse">
							<i class="icon-chevron-up"></i>
						</a>
					</div>

					</div>
						<div class="widget-body">
						<div class="widget-main">
								<div class="row">
									  <div class="col-md-2">
									  <p>{{Form::label('first_name', 'First Name*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
									  <p>{{Form::text('first_name',Input::old('first_name'))}}
								  </div>
								</div>
								<div class="row">
									  <div class="col-md-2">
									 	<p>{{Form::label('last_name', 'Last Name*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::text('last_name',Input::old('last_name'))}}
									  </div>
							</div>
							<div class="row">
								  <div class="col-md-2">
								 	<p>{{Form::label('gender', 'Gender*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::select('gender', array('' => 'Select', 'male' => 'Male', 'female' => 'Female')) }}
								  </div>
							</div>
							<div class="row">
								  <div class="col-md-2">
								 	<p>{{Form::label('dob', 'Date of Birth', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <div class="input-group">
								  <input class="" name="dob" id="id-date-picker-1" type="date" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy"/>
									</div>									
							
								  </div>
							</div>
							
						</div>
					</div>

				</div>

				<div class="widget-box">
					<div class="widget-header">
					<h4>Device Login Credentials</h4>
					<div class="widget-toolbar">
						<a href="#" data-action="collapse">
							<i class="icon-chevron-up"></i>
						</a>
					</div>

					</div>
						<div class="widget-body">
						<div class="widget-main">
								<div class="row">
									  <div class="col-md-2">
									  <p>{{Form::label('username', 'Username (Email)*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
									  <p>{{Form::text('username',Input::old('username'))}}
								  </div>
								</div>
								<div class="row">
									  <div class="col-md-2">
									 	<p>{{Form::label('password', 'Password*', array('class'=>'block clearfix width-100'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::password('password')}}
									  </div>
								</div>

								<div class="row">
									  <div class="col-md-2">
									 	<p>{{Form::label('password_confirmation', 'Confirm Password*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::password('password_confirmation')}}
									  </div>
								</div>

						</div>
					</div>

				</div>


				<div class="row">
					 
					  <div class="col-md-2">
						<p>{{Form::submit('Add New Subscriber',array('class'=>'btn btn-success'))}}	
					  </div>
					  <div class="col-md-2">
						<p><a href="{{URL('/')}}" class="width-65 btn btn-danger">Cancel</a>
					  </div>
				</div>


		{{Form::close() }}
	</div>

	@endif

@stop