@extends('layouts.default')
@section('content')

			<!-- PAGE CONTENT BEGINS -->
			@if (Auth::check())
			
				<div class="col-sm-12 dashboard">
					<h3> Welcome {{Session::get('username') }} to the Orion Dashboard.</h3>
					<h4>({{Session::get('ROLE')}})</h4>
							</div>
								
					<!--<h3>Logged in as : {{Session::get('ROLE')}}</h3> -->
			@endif


			

		<!-- inline scripts related to this page -->
@stop