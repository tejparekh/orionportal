@extends('layouts.default')

@section('content')
<table id="grid-table"></table>

								<div id="grid-pager"></div>
								<script type="text/javascript">
									var $path_base = "/";//this will be used in gritter alerts containing images
								</script>

<script src="assets/js/jqGrid/jquery.jqGrid.min.js"></script>
		<script src="assets/js/date-time/bootstrap-datepicker.min.js"></script>
		<script src="assets/js/jqGrid/i18n/grid.locale-en.js"></script>

		<!-- ace scripts -->

		<script src="assets/js/ace-elements.min.js"></script>
		<script src="assets/js/ace.min.js"></script>

		<!-- inline scripts related to this page -->
				<script src="assets/js/bootbox.min.js"></script>

<script type="text/javascript">
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
					colNames:['','','ID','Subscriber Name', 'Username'],
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
						{name:'username',index:'username',width:140, sortable: true, editable:true, sorttype:"text"}
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

		
				/*jQuery("#m1s").click( function() {
					jQuery("#list9").jqGrid('setSelection',"13");
				});*/
			
				//enable search/filter toolbar
				//jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
			
				//switch element when editing inline
				function aceSwitch( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=checkbox]')
								.wrap('<label class="inline" />')
							.addClass('ace ace-switch ace-switch-5')
							.after('<span class="lbl"></span>');
					}, 0);
				}
				//enable datepicker
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
			
				function enableTooltips(table) {
					$('.navtable .ui-pg-button').tooltip({container:'body'});
					$(table).find('.ui-pg-div').tooltip({container:'body'});
				}
			
				//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');
			
			
			});
		</script>
@stop

