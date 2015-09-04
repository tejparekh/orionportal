@extends('layouts.default')

@section('content')
<div class="col-lg-12">
<div class="widget-box">
	<div class="widget-header">
		<h4>Manage Devices</h4>
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
$(document).ready(function(){

					jQuery("#grid-table").on("click",".editaction", function(e){
							e.preventDefault();

							var Selected 		= jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
							var ret;			
							ret 		 		= jQuery("#grid-table").jqGrid('getRowData',Selected).id;
							if (ret===undefined) {
								bootbox.alert('<h4>Please check the device from the list.</h4>');
							}else{

								window.location 	= 'editdevice?id='+ret;
							}
							
					});
					jQuery("#grid-table").on("click",".deleteaction", function(e){
							e.preventDefault();

							var Selected 		= jQuery("#grid-table").jqGrid('getGridParam','selarrrow');
							var device_id;			
							device_id 		 	= jQuery("#grid-table").jqGrid('getRowData',Selected).id;
							active 		 	= jQuery("#grid-table").jqGrid('getRowData',Selected).active;	


							if (device_id===undefined ) {
								bootbox.alert('<h3>Please check the device to delete.</h3>');
							}else if(active === "Assigned"){
								bootbox.alert('<h3>You cannot delete an assigned device.</h3>');
							}else{

							bootbox.confirm({
										    title: 'Device Deactivation',
										    message: '<h3>Confirm deleting device from system?</h3> <h5>This action is not reversible.<h5>',
										    buttons: {
										        'cancel': {
										            label: 'Cancel',
										            className: 'btn-default pull-left'
										        },
										        'confirm': {
										            label: 'Delete',
										            className: 'btn-danger pull-right'
										        }
										    },
										    callback: function(result) {
										        if (result) {
										             location.href 	= 'deletedevice?id='+device_id;
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
					url: "{{URL('/list-grid-devices')}}",
					jsonReader : {
							      root:"data",
							      page: "current_page",
							      total: "last_page",
							      records: "total",
							      repeatitems: false,
							      id: ""
							   },
					height: "100%",
					colNames:['','','ID','Model', 'IMEI' , 'Kernel Version','OS Version','Status' ,'Distributor','Sub-Distributor'],
					colModel:[
						{name:'editcompanion',
				             index:'editcompanion',
				             width:10, editable: false,
				             formatter: EditCustomer},//add custom formatter function name
				        {name:'deleteevent',
				             index:'deleteevent',
				             width:10, editable: false,
				             formatter: DeleteEvent},
						
						{name:'id',index:'id', width:15, sortable: true, sorttype:"int", editable: true},
						{name:'model',index:'model', width:45, sortable: true, sorttype:"text", editable: true},
						{name:'imei',index:'imei', width:45, sortable: true, sorttype:"text", editable: true},
						{name:'kernel_version',index:'kernel_version',width:50, sortable: true, editable:true, sorttype:"text"},
						{name:'os_version',index:'os_version',width:50, sortable: true, editable:true, sorttype:"text"},
						{name:'active',index:'active',width:50, sortable: true, editable:true, sorttype:"text"},
						{name:'distributor',index:'distributor',width:50, sortable: true, editable:true, sorttype:"text"},
						{name:'sub-distributor',index:'sub-distributor',width:50, sortable: true, editable:true, sorttype:"text"},
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
						    $("#grid-table").jqGrid('setGridWidth', $('.widget-main').width(), true);
						}).trigger('resize');

						var table = this;
						setTimeout(function(){
							updatePagerIcons(table);
						}, 0);
						
					},
							
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

