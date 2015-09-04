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

		</div>
	</div>
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

			})

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
					url: "{{URL('/list-grid-producers')}}",
					jsonReader : {
							      root:"data",
							      page: "current_page",
							      total: "last_page",
							      records: "total",
							      repeatitems: false,
							      id: ""
							   },
					height: "100%",
					colNames:['','','User Id','Producer Name', 'Business Name','Certificate Number'],
					colModel:[
						{name:'editcompanion',
				             index:'editcompanion',
				             width:10, editable: false,
				             formatter: EditCustomer},//add custom formatter function name
				        {name:'deleteevent',
				             index:'deleteevent',
				             width:10, editable: false,
				             formatter: DeleteEvent},
						
						{name:'user_id',index:'user_id', width:15, sortable: true, sorttype:"int", editable: true},
						{name:'name',index:'name', width:45, sortable: true, sorttype:"text", editable: true},
						{name:'business_name',index:'business_name',width:50, sortable: true, editable:true, sorttype:"text"},
						// {name:'estd_certificate',index:'estd_certificate', width:30, sortable: true, sorttype:"int", editable: true},
						{name:'certificate_num',index:'certificate_num', width:30, sortable: true, sorttype:"int", editable: true},

						// {name:'assignDevice',
				  //            index:'assignDevice',
				  //            width:50, editable: false,
				  //            formatter: assignDevice},
				       ], 
			
					pager: pager_selector,
					gridview: true,
	                ignoreCase: true,
	                rowNum : 10,
	                sortname: 'user_id',
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

@stop

