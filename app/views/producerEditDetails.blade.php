@extends('layouts.default')
@section('content')

<!-- PAGE CONTENT BEGINS -->
@if (Auth::check())
@if($dataPresent)
	<div class="col-lg-12">
		{{Form::open(array('url'=>'update-producer-details', 'name'=>'edit-producer-register-form','id'=>'edit-producer-register-form','files'=>'true'))}}


			{{Form::hidden('bank_details_id', $formData['bank_details_id']) }}
			{{Form::hidden('producer_id', $formData['producer_id']) }}
			{{Form::hidden('address_contact_ID', $formData['address_contact_ID']) }}
			{{Form::hidden('user_id', $formData['user_id']) }}

				<div class="widget-box">
					<div class="widget-header">
					<h4>Registration Details</h4>
					</div>
						<div class="widget-body">
						<div class="widget-main">
							<div class="row form-elements-row">
								  <div class="col-md-4">
								  <p>{{Form::label('first_name', 'First Name*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <p>{{Form::text('first_name',$formData['first_name'],Input::old('first_name'))}}
							  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('last_name', 'Last Name*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('last_name',$formData['last_name'],Input::old('last_name'))}}
								  </div>
							</div>
							
							<div class="row form-elements-row">
								  <div class="col-md-4">
								  <p>{{Form::label('business_name', 'Business Name*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <p>{{Form::text('business_name',$formData['business_name'] ,Input::old('business_name')  )}}
							  </div>
							</div>

							<div class="row form-elements-row">
								  <div class="col-md-4">
								  <p>{{Form::label('mobile_otp', 'Mobile No. for OTP*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <p>{{Form::text('mobile_otp',$formData['mobile_otp'] ,Input::old('mobile_otp')  )}}
							  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								  <p>{{Form::label('address', 'Address*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <p>{{Form::textarea('address',$formData['address'] ,array('rows'=>3)  )}}
							  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								  <p>{{Form::label('contact_num', 'Contact No.*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <p>{{Form::text('contact_num',$formData['contact_num'],Input::old('contact_num'))}}
							  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								  <p>{{Form::label('email_id', 'Mail ID*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
								  <p>{{Form::text('email_id',$formData['email_id'],Input::old('email_id'))}}
							  </div>
							</div>

							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('estd_certificate', 'Establishment Certificate*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::file('estd_certificate',Input::old('estd_certificate'),array('id'=>'estd_certificate')  ) }}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('certificate_num', 'Certificate No*', array('class'=>'block clearfix')) }}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('certificate_num',$formData['certificate_num'] ,Input::old('certificate_num')) }}
								  </div>
							</div>
							
							
						</div>
					</div>

				</div>

				<div class="widget-box">
					<div class="widget-header">
					<h4>Bank Details</h4>
					</div>
						<div class="widget-body">
						<div class="widget-main">
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('bank_name', 'Bank Name*', array('class'=>'block clearfix')) }}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('bank_name',$formData['bank_name'] ,Input::old('bank_name')) }}
								  </div>
							</div>

							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('branch_name', 'Branch Name*', array('class'=>'block clearfix')) }}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('branch_name',$formData['branch_name'] ,Input::old('branch_name')) }}
								  </div>
							</div>
							
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('ifsc_code', 'IFSC code*', array('class'=>'block clearfix')) }}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('ifsc_code',$formData['ifsc_code'] ,Input::old('ifsc_code')) }}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('account_num', 'Account Number*', array('class'=>'block clearfix')) }}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('account_num',$formData['account_num'] ,Input::old('account_num')) }}
								  </div>
							</div>


						</div>
					</div>

				</div>


				<div class="row">
					 
					  <div class="col-md-2">
						<p>{{Form::submit('Update Details',array('class'=>'btn btn-success'))}}	
					  </div>
					  <div class="col-md-2">
						<p><a href="{{URL('/')}}" class="width-65 btn btn-danger">Cancel</a>
					  </div>
				</div>


		{{Form::close() }}
	</div>
		@else
			<div class="col-lg-12">
				<h4>There is not data available for the Producer selected. Kindly check for another Producer.</h4>
			</div>
		@endif
	@endif

@stop