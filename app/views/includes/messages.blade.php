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

@endif