@extends('layouts.default')
@section('content')

<!-- PAGE CONTENT BEGINS -->
@if (Auth::check())
	<div class="col-lg-12">
		

				<div class="widget-box">
					<div class="widget-header">
					<h4>Choose Movie to View details</h4>
					</div>
						<div class="widget-body">
						<div class="widget-main">
						<div class="row form-elements-row">
						@if(!empty($moviesList))
						<div class="col-md-4">
						  <p>{{Form::label('movies_view_list', 'Choose Movie to View Details*', array('class'=>'block clearfix'))}}
						  </div>
						  <div class="col-md-8">
							{{Form::select('movies_view_list', array(''=>'Select Movie')+ $moviesList, array('name' => '$moviesList[movie_title]'))}}
							</div>
							@else
							<div class="col-lg-12">
								<h4 class="red">Please register a movie/content.</h4>
							</div>
							@endif
						</div>

					</div>
				</div>
			</div>
				@if(!empty($formData))
				{{Form::model($formData, array('url'=>'', 'name'=>'movie-register-form','id'=>'','files'=>'true'))}}
				{{Form::hidden('movie_id',$movie_id )}}
				<?php 
				if (!empty($formData['inland_release_time']) ) {
					$formData['inland_release_time'] = explode(" ", $formData['inland_release_time']);
					$formData['inland_release_time'][0] = date('d-m-Y', strtotime($formData['inland_release_time'][0]) );
					$formData['inland_release_time'][1] = date('h:i:s', strtotime($formData['inland_release_time'][1]) );
				}
				if (!empty($formData['overseas_release_time'] )) {
					$formData['overseas_release_time'] = explode(" ", $formData['overseas_release_time']);
					
					$formData['overseas_release_time'][0] = date('d-m-Y', strtotime($formData['overseas_release_time'][0]) );
					$formData['overseas_release_time'][1] = date('h:i:s', strtotime($formData['overseas_release_time'][1]) );
				}
					
				?>
				<div class="widget-box">
					<div class="widget-header">
					<h4>Content Registration Detail</h4>
					</div>
					
						<div class="widget-body">
						<div class="widget-main">
								<div class="row form-elements-row">
									  <div class="col-md-4">
									  <p>{{Form::label('production_house', 'Production House/ Banner*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
									  <p>{{Form::text('production_house' ,Input::old('production_house'), array('readonly') )}}
								  </div>
								</div>
								<div class="row form-elements-row">
									  <div class="col-md-4">
									 	<p>{{Form::label('content_right_holder', 'Content Right Holder*', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
										<p>{{Form::text('content_right_holder',Input::old('content_right_holder'), array('readonly') )}}
									  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('authorized_signatory', 'Authorized Signatory*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('authorized_signatory',Input::old('authorized_signatory') , array('readonly') )}}
								  </div>
							</div>
								
								<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('title', 'Movie/Content/Title*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('title',Input::old('title'), array('readonly') )}}
								  </div>
							</div>


							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('language', 'Language of Content*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('language',Input::old('language') , array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('length', 'Length in Hour/Minute/Second*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('length',Input::old('length') ,array('placeholder'=>'hh:mm:ss','readonly'=>true) )}}
								  </div>
							</div>

							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('file_format', 'Format/ File Extension*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('file_format',Input::old('file_format'), array('placeholder'=>'*dpx/*mov/*mp4/*avi/*j2k/*tga','readonly'=>true ) )}}
								  </div>
							</div>

							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('censor_certificate', 'Censor Certificate*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::file('censor_certificate',Input::old('censor_certificate'),array('id'=>'censor_certificate','readonly'=>true )  )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('censor_certificate_num', 'Censor Certificate No*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('censor_certificate_num',Input::old('censor_certificate_num'), array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('starcast', 'Star Cast*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::textarea('starcast',Input::old('starcast') ,array('placeholder'=>'Please enter comma(,) seperated values','readonly'=>true )  )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('directors', 'Directors*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::textarea('directors',Input::old('directors') ,array('placeholder'=>'Please enter comma(,) seperated values','readonly'=>true )  )}}
								  </div>
							</div>

							
						</div>
					</div>

				</div>

				<div class="widget-box">
					<div class="widget-header">
					<h4>Release Detail</h4>

					</div>
						<div class="widget-body">
						<div class="widget-main">
								<div class="row form-elements-row">
									  <div class="col-md-4">
									  <p>{{Form::label('location_release', 'Location/Region of Release', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
									  <p>{{Form::textarea('location_release',Input::old('location_release') ,array('placeholder'=>'Please enter comma(,) seperated values',
									  															'rows'=>3,'readonly'=>true )  )}}
								  </div>
								</div>
								<div class="row form-elements-row">
									  <div class="col-md-4">
									  <p>{{Form::label('exclude_location_release', 'Location/Region excluded of Release', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-5">
									  <p>{{Form::textarea('exclude_location_release',Input::old('exclude_location_release') ,array('placeholder'=>'Please enter comma(,) seperated values',
									  															'rows'=>3,'readonly'=>true )  )}}
								  </div>
								</div>
								
								<div class="row form-elements-row">
									  <div class="col-md-4">
									  <p>{{Form::label('inland_release_time', 'Date & Time of Release (Inland) IST ', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-7">
											<div class="input-group">
												<input class="form-control date-picker" name="inland_release_time[]" id="release_time_inland_datepick" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy" value="{{$formData['inland_release_time'][0]}}">
											</div>
											<div class="input-group bootstrap-timepicker">
												<input id="release_time_inland_time" name="inland_release_time[]" type="text" class="form-control" value="{{$formData['inland_release_time'][1]}}" />
											</div>
								  </div>
								
								</div>
								
								<div class="row form-elements-row">
									  <div class="col-md-4">
									  <p>{{Form::label('overseas_release_time', 'Date & Time of Release (Overseas) GMT', array('class'=>'block clearfix'))}}
									  </div>
									  <div class="col-md-7">
											<div class="input-group">
												<input class="form-control date-picker" name="overseas_release_time[]" id="release_time_overseas_datepick" type="text" data-date-format="dd-mm-yyyy" placeholder="dd-mm-yyyy"  value="{{$formData['overseas_release_time'][0]}}" >
											</div>
											<div class="input-group bootstrap-timepicker">
												<input id="release_time_overseas_time" name="overseas_release_time[]" type="text" class="form-control" value="{{$formData['overseas_release_time'][1]}}"  />
											</div>
								  </div>
								
								</div>
								
								<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('release_fdfs', 'Release for FDFS*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('release_fdfs',Input::old('release_fdfs'), array('readonly') )}}
								  </div>
							</div>


						</div>
					</div>

				</div>
				
				<div class="widget-box">
					<div class="widget-header">
					<h4>Pricing</h4>

					</div>
						<div class="widget-body">
						<div class="widget-main">
							
								
								<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('fdfs_price', 'FDFS Price (PPV individual)*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('fdfs_price',Input::old('fdfs_price'), array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('release_premium_library', 'Release for Premium Library*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('release_premium_library',Input::old('release_premium_library') , array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('premium_library_price', 'Premium Library (PPV individual) Price*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('premium_library_price',Input::old('premium_library_price'), array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('release_other_individual', 'Release Other than Individual Customer*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('release_other_individual',Input::old('release_other_individual'), array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('ppv_other_individual', 'PPV Other than Individual Customer*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('ppv_other_individual',Input::old('ppv_other_individual'), array('readonly') )}}
								  </div>
							</div>


						</div>
					</div>

				</div>

				<div class="widget-box">
					<div class="widget-header">
					<h4>Contact & Authorization Detail</h4>

					</div>
						<div class="widget-body">
						<div class="widget-main">
							
								
								<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('contact_authorized_signatory', 'Authorized Signatory*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('contact_authorized_signatory',Input::old('contact_authorized_signatory'), array('readonly') )}} 
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('contact_mobile_otp', 'Mobile no for OTP*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('contact_mobile_otp',Input::old('contact_mobile_otp'), array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('email_to_authorise', 'Email for authorisation code*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::text('email_to_authorise',Input::old('email_to_authorise'), array('readonly') )}}
								  </div>
							</div>
							<div class="row form-elements-row">
								  <div class="col-md-4">
								 	<p>{{Form::label('others_noc', 'Others/ NOC*', array('class'=>'block clearfix'))}}
								  </div>
								  <div class="col-md-5">
									<p>{{Form::textarea('others_noc',Input::old('others_noc') ,array('placeholder'=>'Please enter comma(,) seperated values',
									  															'rows'=>3,'readonly'=>true )  )}}
								  </div>
							</div>

						</div>
					</div>

				</div>

				<!-- <div class="row">
					 
					  <div class="col-md-2">
						<p>{{Form::submit('Update Movie',array('class'=>'btn btn-success'))}}	
					  </div>
					  <div class="col-md-2">
						<p><a href="{{URL('/')}}" class="width-65 btn btn-danger">Cancel</a>
					  </div>
				</div> -->
			@endif
	
		{{Form::close() }}
	</div>

	@endif
	<script type="text/javascript">
	$('#movies_view_list option')
     .removeAttr('selected')
     .filter('[value={{Session::get('movie_id')}}]')
     .prop('selected', true);
     </script>
@stop