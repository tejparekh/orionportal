@extends('layouts.default')
@section('content')

<!-- PAGE CONTENT BEGINS -->
@if (Auth::check())
	<div class="col-lg-12">
			{{Form::model($formData, array('url'=>'doupdatesubscriber', 'name'=>'subscriber-update-form','id'=>'subscriber-update-form','files'=>'true'))}}
				{{Form::hidden('user_id',$user_id )}}
				<div class="widget-box">
					<div class="widget-header">
					<h4>Subscriber Details</h4>
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
									<p>{{Form::select('gender' ,array('' => 'Select', 'm' => 'Male', 'f' => 'Female'), $formData['gender'] ) }}
								  </div>
							</div>
							<div class="row">
								  <div class="col-md-2">
								 	<p>{{Form::label('dob', 'Date of Birth', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <div class="input-group">
								  <input class="" name="dob" id="id-date-picker-1" type="date" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" value="{{ date('d-m-Y', strtotime($formData['date_of_birth']) )}}" />
									</div>									
							
								  </div>
							</div>
							
						</div>
					</div>

				</div>

				<div class="widget-box">
					<div class="widget-header">
					<h4>Device Login Credentials</h4>
					</div>
						<div class="widget-body">
						<div class="widget-main">
								<div class="row">
									  <div class="col-md-2">
									  <p>{{Form::label('username', 'Username (Email)*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
									  <p>{{Form::text('username',Input::old('username'), array('readonly'))}}
								  </div>
								</div>
								<!-- <div class="row">
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
								</div> -->

						</div>
					</div>

				</div>


				<div class="row">
					 
					  <div class="col-md-2">
						<p>{{Form::submit('Add New Subscriber',array('class'=>'btn btn-success'))}}	
					  </div>
					  <div class="col-md-2">
						<p><a href="{{URL('/subscribers-list')}}" class="width-65 btn btn-danger">Cancel</a>
					  </div>
				</div>


		{{Form::close() }}
	</div>

	@endif

@stop