@extends('layouts.default')

@section('content')
<div class="col-lg-12">
	<div class="widget-box">
		<div class="widget-header">
			<h4>Manage Subscribers</h4>
		</div>

		<div class="widget-body">
		<div class="widget-main">
			<table id="grid-table"></table>

			<div id="grid-pager"></div>
			
			<h5>Choose the subscriber from the table above and perform the actions.</h5>
			<h4>Actions : <a href="#" class="btn btn-success assign-device" id="assign-a-device">Get Available Devices</a>
			<a href="#" class="btn btn-danger deassign-device" id="deassign-a-device">Un-Assign device</a> </h4>
		</div>
	</div>
	</div>

	<p></p>
	<div class="widget-box assign-device-container" style="display:none;">
	<div class="widget-header">
		<h4>Assign Devices</h4>
	</div>

	<div class="widget-body">
	<div class="widget-main">
		<table id="grid-devices"></table>

		<div id="pager-devices"></div>
		
	</div>
</div>
		<a href="#" class="btn btn-success do-assign-device" id="do-assign-device">Assign Device</a>

</div>

</div>









<script type="text/javascript">
var $path_base = "/";//this will be used in gritter alerts containing images
</script>


<script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
		<script src="assets/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="assets/js/jqGrid/i18n/grid.locale-en.js"></script>

		<!-- inline scripts related to this page -->
<script src="assets/js/bootbox.min.js"></script>

<script type="text/javascript">
			$(window).resize(function() {
						    $("#grid-table").jqGrid('setGridWidth', $('.widget-main').width(), true);
						}).trigger('resize');

			$('#assign-a-device').on("click",function (e) {
				e.preventDefault();
				var Selected 		= jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
				var ret;			
				ret 		 		= jQuery("#grid-table").jqGrid('getRowData',Selected).userID;

				var isassigned	 		= jQuery("#grid-table").jqGrid('getRowData',Selected).device_id;
				if (ret===undefined ) {
					bootbox.alert('<h4>Please check the Subscriber from the list</h4>');
					$('.assign-device-container').hide();
				}else if(isassigned != undefined && isassigned!="" && isassigned!=null){
					bootbox.alert('<h4>The subscriber is already assigned a device.</h4>');
					$('.assign-device-container').hide();

				}else{
					$('.assign-device-container').show();
					// window.location 	= 'assign-device?data='+ret+'-'+username;
				}

			})

			$('#do-assign-device').on("click",function (e) {
				e.preventDefault();
				var Selected 		= jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
				var Devices 		= jQuery("#grid-devices").jqGrid('getGridParam','selrow');

				var ret;			
				ret 		 		= jQuery("#grid-table").jqGrid('getRowData',Selected).userID;
				username 		 		= jQuery("#grid-table").jqGrid('getRowData',Selected).userID;

				var isassigned	 		= jQuery("#grid-table").jqGrid('getRowData',Selected).device_id;
				device_id	 		= jQuery("#grid-devices").jqGrid('getRowData',Devices).id;


				if (ret===undefined ) {
					bootbox.alert('<h4>Please check the Subscriber from the list</h4>');
				}else if(isassigned != undefined && isassigned!="" && isassigned!=null ){
					bootbox.alert('<h4>The subscriber is already assigned a device.</h4>');

				}else if(device_id == undefined){
					bootbox.alert('<h4>Please select the device.</h4>');
				}
				else{
					window.location 	= 'assign-device?user_id='+ret+'&device_id='+device_id;
				}

			});
			
			$(document).ready(function(){

					jQuery("#grid-table").on("click",".editaction", function(e){
							e.preventDefault();

							var Selected 		= jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
							var ret;			
							ret 		 		= jQuery("#grid-table").jqGrid('getRowData',Selected).userID;
							if (ret===undefined) {
								bootbox.alert('Please check the subscriber.');
							}else{

								window.location 	= 'editsubscriber?id='+ret;
							}
							
					});
					jQuery("#grid-table").on("click",".deleteaction", function(e){
							e.preventDefault();

							var Selected 		= jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
							var ret;		
							ret 		 		= jQuery("#grid-table").jqGrid('getRowData',Selected).userID;
							var device_id;			
							device_id 		 	= jQuery("#grid-table").jqGrid('getRowData',Selected).device_id;	

							if (ret===undefined) {
								bootbox.alert('<h3>Please check the subscriber to Deactivate</h3>');
							}else {
							bootbox.confirm({
										    title: 'Subscriber Deactivation',
										    message: '<h3>Confirm Subscriber Deactivation?</h3> <h5>This action is not reversible.<h5>',
										    buttons: {
										        'cancel': {
										            label: 'Cancel',
										            className: 'btn-default pull-left'
										        },
										        'confirm': {
										            label: 'Deactivate',
										            className: 'btn-danger pull-right'
										        }
										    },
										    callback: function(result) {
										        if (result) {
										             location.href 	= 'deletesubscriber?id='+ret;
										        }
										    }
										});
							}
						});
					jQuery("#deassign-a-device").on("click", function(e){
							e.preventDefault();

							var Selected 		= jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
							var ret;		
							ret 		 		= jQuery("#grid-table").jqGrid('getRowData',Selected).userID;
							var device_id;			
							device_id 		 	= jQuery("#grid-table").jqGrid('getRowData',Selected).device_id;	

							if (ret===undefined) {
								bootbox.alert('<h3>Please check the Provider to Deactivate</h3>');
							}else if(device_id == undefined || device_id==null || device_id == ""){
								bootbox.alert('<h3>The subscriber doesnot have the device assigned.</h3>');
							}else {
							bootbox.confirm({
										    title: 'Un-Assign Device of Subscriber',
										    message: '<h3>Are you sure you want to unassign device for the subscriber?</h3> <h5>This action is not reversible.<h5>',
										    buttons: {
										        'cancel': {
										            label: 'Cancel',
										            className: 'btn-default pull-left'
										        },
										        'confirm': {
										            label: 'Un-Assign',
										            className: 'btn-danger pull-right'
										        }
										    },
										    callback: function(result) {
										        if (result) {
										             location.href 	= 'deassigndevice?id='+ret;
										        }
										    }
										});
							}
						});

			});


			var grid_data = [];	
			
			jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";
				$.extend(jQuery.jgrid.defaults, {
                prmNames: {
                    id: "_rowid", page: "_page", rows: "_rows",
                    oper: "_oper", sort: "_sidx", order: "_sord"
                }
            });

				jQuery(grid_selector).jqGrid({
					//direction: "rtl",
					
					data: [],
					datatype: "json",
					url: "{{URL('/list-grid-subscribers')}}",
					jsonReader : {
							      root:"data",
							      page: "current_page",
							      total: "last_page",
							      records: "total",
							      repeatitems: false,
							      id: ""
							   },
					height: "100%",
					colNames:['','','ID','Subscriber Name', 'Username',' Device ID'],
					colModel:[
						{name:'editcompanion',
				             index:'editcompanion',
				             width:10, editable: false,
				             formatter: EditCustomer},//add custom formatter function name
				        {name:'deleteevent',
				             index:'deleteevent',
				             width:10, editable: false,
				             formatter: DeleteEvent},
						
						{name:'userID',index:'userID', width:15, sortable: true, sorttype:"int", editable: true},
						{name:'name_user',index:'name_user', width:45, sortable: true, sorttype:"text", editable: true},
						{name:'username',index:'username',width:50, sortable: true, editable:true, sorttype:"text"},
						{name:'device_id',index:'device_id', width:30, sortable: true, sorttype:"int", editable: true},
						// {name:'assignDevice',
				  //            index:'assignDevice',
				  //            width:50, editable: false,
				  //            formatter: assignDevice},
				       ], 
			
					pager: pager_selector,
					gridview: true,
	                ignoreCase: true,
	                rowNum : 10,
	                sortname: 'userID',
	                viewrecords: true,
	                sortorder: 'desc',
	                pageable: true,
					//toppager: true,
					
					multiselect: true,
					//multikey: "ctrlKey",
					//sortname: 'community_name',
            		//sortorder: "asc",
			        multiboxonly: true,
			
					loadComplete : function() {
						$(window).resize(function() {
						    $("#grid-table").jqGrid('setGridWidth', $('.widget-main').width(), true);
						}).trigger('resize');

						var table = this;
						setTimeout(function(){
							updatePagerIcons(table);
						}, 0);

					},
					onSelectRow: function(id, data){ 
					},
					autowidth: true
			
				});
				jQuery("#grid-table").jqGrid('navGrid','#grid-pager',{add:false,del:false,edit:false,position:'right'}, {alertzIndex: false});
			


				/*jQuery("#m1").click( function() {
					var s;
					s = jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
					alert(s);
				});
*/
				/*Hyperlink to Edit the Companion and Populate the Form*/
				function EditCustomer(cellValue, options, rowdata, action) 
					{
					    
					    return "<a href='' class='editaction'><i class='icon-pencil bigger-130'></i></a>";
					}  

				function DeleteEvent(cellValue, options, rowdata, action) 
					{
					    
					    return "<a href='' class='deleteaction'><i class='icon-trash bigger-130'></i></a>";
					}  
				function assignDevice (cellValue, options, rowdata, action ) {
					// body...
				}
		
				/*jQuery("#m1s").click( function() {
					jQuery("#list9").jqGrid('setSelection',"13");
				});*/
			
				//enable search/filter toolbar
				//jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
			
				//switch element when editing inline
		
				function pickDate( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=text]')
								.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
					}, 0);
				}

				//navButtons
				jQuery(grid_selector).jqGrid('navGrid',pager_selector,
					{ 	//navbar options
						edit: true,
						editicon : 'icon-pencil blue',
						add: true,
						addicon : 'icon-plus-sign purple',
						del: true,
						delicon : 'icon-trash red',
						search: true,
						searchicon : 'icon-search orange',
						refresh: true,
						refreshicon : 'icon-refresh green',
						view: true,
						viewicon : 'icon-zoom-in grey',
					})
				

				
				
				//replace icons with FontAwesome icons like above
				function updatePagerIcons(table) {
					var replacement = 
					{
						'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
						'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
						'ui-icon-seek-next' : 'icon-angle-right bigger-140',
						'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
					};
					$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
						
						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					})
				}
		
			
				//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
			
			
			});
		</script>

<script type="text/javascript">
			var grid_data = [];	
			
			jQuery(function($) {
				var grid_selector = "#grid-devices";
				var pager_selector = "#pager-devices";
				$.extend(jQuery.jgrid.defaults, {
                prmNames: {
                    id: "_rowid", page: "_page", rows: "_rows",
                    oper: "_oper", sort: "_sidx", order: "_sord"
                }
            });

				jQuery(grid_selector).jqGrid({
					//direction: "rtl",
					
					data: [],
					datatype: "json",
					url: "{{URL('/list-grid-devices?unassigned=true')}}",
					jsonReader : {
							      root:"data",
							      page: "current_page",
							      total: "last_page",
							      records: "total",
							      repeatitems: false,
							      id: ""
							   },
					height: "100%",
					colNames:['ID','Model', 'IMEI' , 'Kernel Version','OS Version','Status'],
					colModel:[
						{name:'id',index:'id', width:15, sortable: true, sorttype:"int", editable: true},
						{name:'model',index:'model', width:45, sortable: true, sorttype:"text", editable: true},
						{name:'imei',index:'imei', width:45, sortable: true, sorttype:"text", editable: true},
						{name:'kernel_version',index:'kernel_version',width:50, sortable: true, editable:true, sorttype:"text"},
						{name:'os_version',index:'os_version',width:50, sortable: true, editable:true, sorttype:"text"},
						{name:'active',index:'active',width:50, sortable: true, editable:true, sorttype:"text"}


				       ], 
			
					pager: pager_selector,
					gridview: true,
	                ignoreCase: true,
	                rowNum : 10,
	                sortname: 'id',
	                viewrecords: true,
	                sortorder: 'desc',
	                pageable: true,
					//toppager: true,
					
					multiselect: true,
					//multikey: "ctrlKey",
					//sortname: 'community_name',
            		//sortorder: "asc",
			        multiboxonly: true,
			
					loadComplete : function() {
						$(window).resize(function() {
						    $("#grid-devices").jqGrid('setGridWidth', $('.widget-main').width(), true);
						}).trigger('resize');

						var table = this;
						setTimeout(function(){
							updatePagerIcons(table);
						}, 0);
						
					},
				
					
					autowidth: true
			
				});
				jQuery("#grid-devices").jqGrid('navGrid','#grid-devices',{add:false,del:false,edit:false,position:'right'}, {alertzIndex: false});
			


				/*jQuery("#m1").click( function() {
					var s;
					s = jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
					alert(s);
				});
*/
				/*Hyperlink to Edit the Companion and Populate the Form*/
				function EditCustomer(cellValue, options, rowdata, action) 
					{
					    
					    return "<a href='' class='editaction'><i class='icon-pencil bigger-130'></i></a>";
					}  

				function DeleteEvent(cellValue, options, rowdata, action) 
					{
					    
					    return "<a href='' class='deleteaction'><i class='icon-trash bigger-130'></i></a>";
					}  

		
				/*jQuery("#m1s").click( function() {
					jQuery("#list9").jqGrid('setSelection',"13");
				});*/
			
				//enable search/filter toolbar
				//jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
			
				//switch element when editing inline
		
				function pickDate( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=text]')
								.datepicker({format:'yyyy-mm-dd' , autoclose:true}); 
					}, 0);
				}

				//navButtons
				jQuery(grid_selector).jqGrid('navGrid',pager_selector,
					{ 	//navbar options
						edit: true,
						editicon : 'icon-pencil blue',
						add: true,
						addicon : 'icon-plus-sign purple',
						del: true,
						delicon : 'icon-trash red',
						search: true,
						searchicon : 'icon-search orange',
						refresh: true,
						refreshicon : 'icon-refresh green',
						view: true,
						viewicon : 'icon-zoom-in grey',
					})
				

				
				
				//replace icons with FontAwesome icons like above
				function updatePagerIcons(table) {
					var replacement = 
					{
						'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
						'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
						'ui-icon-seek-next' : 'icon-angle-right bigger-140',
						'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
					};
					$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
						
						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					})
				}
		
			
				//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
			$(window).resize(function() {
				    $("#grid-table").jqGrid('setGridWidth', $('.widget-main').width(), true);
				}).trigger('resize');
			
			});
		</script>


@stop

