@extends('layouts.default')
@section('content')

<!-- PAGE CONTENT BEGINS -->
@if (Auth::check())
	<div class="col-lg-12">
		{{Form::open(array('url'=>'add-device', 'name'=>'device-register-form','id'=>'device-register-form','files'=>'true'))}}
				<div class="widget-box">
					<div class="widget-header">
					<h4>Device Details</h4>
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
									  <p>{{Form::label('model', 'Model*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
									  <p>{{Form::text('model',Input::old('model'))}}
								  </div>
								</div>
								<div class="row">
									  <div class="col-md-2">
									 	<p>{{Form::label('imei', 'Device IMEI*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::text('imei',Input::old('imei'))}}
									  </div>
								</div>
								
								<div class="row">
									  <div class="col-md-2">
									 	<p>{{Form::label('os_version', 'OS version*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::text('os_version',Input::old('os_version'))}}
									  </div>
								</div>

								<div class="row">
									  <div class="col-md-2">
									 	<p>{{Form::label('build_number', 'Software Build Number*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::text('build_number',Input::old('build_number'))}}
									  </div>
								</div>
								<div class="row">
									  <div class="col-md-2">
									 	<p>{{Form::label('kernel_version', 'Kernel version*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::text('kernel_version',Input::old('kernel_version'))}}
									  </div>
								</div>
						</div>
					</div>

				</div>

				<div class="row">
					 
					  <div class="col-md-2">
						<p>{{Form::submit('Add New Device',array('class'=>'btn btn-success'))}}	
					  </div>
					  <div class="col-md-2">
						<p><a href="{{URL('/')}}" class="width-65 btn btn-danger">Cancel</a>
					  </div>
				</div>


		{{Form::close() }}
	</div>

	@endif

@stop