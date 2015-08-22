<!DOCTYPE html>
<html>
<head>
	@include('includes.include')
	@yield('script')
	@yield('css')
</head>
<body>
@include('includes.header')
<div class="main-container" id="main-container">

	<div class="main-container-inner">
		<a class="menu-toggler" id="menu-toggler" href="#">
			<span class="menu-text"></span>
		</a>
		<div class="sidebar" id="sidebar">
			
				<script type="text/javascript">
					try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
				</script>

				@include('includes.menu')

				<div class="sidebar-collapse" id="sidebar-collapse">
					<i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
				</div>
		</div>

		<!-- MAIN FRAME OF DASHBOARD -->
<div class="main-content">
	<div class="page-content">
		<div class="row">
			<div class="col-sm-12">
			</div>
			
			<!-- PAGE CONTENT BEGINS -->
				@include('includes.title')
				@include('includes.messages')
				@yield('content')
			<!-- PAGE CONTENT ENDS -->
			</div><!-- /.col -->
		</div><!-- /.row -->
	</div><!-- /.page-content -->
</div><!-- /.main-content -->

</div><!-- /.main-container-inner -->
</div><!-- /.main-container -->

<!-- basic scripts -->

		<script type="text/javascript">
			window.jQuery || document.write("<script src='assets/js/jquery-2.0.3.min.js'>"+"<"+"/script>");
		</script>
		<script src="assets/js/typeahead-bs2.min.js"></script>

		<!-- page specific plugin scripts -->

		<!-- ace scripts -->

		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>
		@include('includes.footer')
	
</body>

</html>