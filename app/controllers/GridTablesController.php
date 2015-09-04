<?php
/**
 * @author Tej Parekh <tejparekh2402@gmail.com>	
 * Date : 19 Aug 2015
 * Registration controller for all the users type in the orion dashboard. 
 */
class GridTablesController extends BaseController
{
	
	public function __construct()
	{

	}

	/**
	 * Get the login page that is called from the routes.php file. 
	 * the respective method that is claimed by the route is called
	 * @return [type] [description]
	 */
	public static function getSubscribersGridList()
	{
		$objSubscribersModel = new Subscribers();
		$sortColName	 			= 	Input::get('_sidx');
		$sortOrder 					= 	Input::get('_sord');

		$recordsPerPage = 10;  //Records per page
		if(Input::has('_page')){
		$arrSubscriberParent['current_page'] = Input::get('_page'); // Curent page of teh pagination grid;
		}else{
		$arrSubscriberParent['current_page'] = 1;
		}
		$offsetValue = (Input::get('_page')*$recordsPerPage)-($recordsPerPage); //Calculating the offset value for the data to be rertieved

		if ($offsetValue < 0) {
			$offsetValue = 0; //Set offset value 1 when the 1st page is called as it is the negative value.
		}

		
		
		$arrSubscribers		= 	$objSubscribersModel->getSubscribersGridListData( $sortOrder, $offsetValue, $recordsPerPage, $sortColName);
		$arrSubscribersCount		= 	$objSubscribersModel->getSubscribersGridListCount();

		
		$arrSubscriberParent['total']= $arrSubscribersCount;
		$arrSubscriberParent['per_page']= $recordsPerPage;
		$totalpages = $arrSubscribersCount / $recordsPerPage;

		if (is_float($totalpages)) {
			$totalpages = (int) $totalpages + 1;
			$arrSubscriberParent['last_page']=$totalpages;
		}else{
			$arrSubscriberParent['last_page']=$totalpages;

		}
		$arrSubscriberParent['from']=$offsetValue;
		if ($arrSubscriberParent['current_page'] == $arrSubscriberParent['last_page']) {
			$arrSubscriberParent['to']= $arrSubscriberParent['total'];
			
		}else{
			$arrSubscriberParent['to']= $offsetValue+9;
		}
		$arrSubscriberParent['data']=$arrSubscribers;

		echo json_encode($arrSubscriberParent);

	}

	public static function getDevicesGridList()
	{
		$objDevicesModel = new Device();
		$sortColName	 			= 	Input::get('_sidx');
		$sortOrder 					= 	Input::get('_sord');
		$input = Input::all();
		$recordsPerPage = 10;  //Records per page
		if(Input::has('_page')){
		$arrDeviceParent['current_page'] = Input::get('_page'); // Curent page of teh pagination grid;
		}else{
		$arrDeviceParent['current_page'] = 1;
		}
		$offsetValue = (Input::get('_page')*$recordsPerPage)-($recordsPerPage); //Calculating the offset value for the data to be rertieved

		if ($offsetValue < 0) {
			$offsetValue = 0; //Set offset value 1 when the 1st page is called as it is the negative value.
		}

		
		if (isset($input['unassigned'])) {
			$unassigned = 0;
			$arrDevices		= 	$objDevicesModel->DevicesGridListData( $sortOrder, $offsetValue, $recordsPerPage, $sortColName, $unassigned);
			$arrDevicesCount		= 	$objDevicesModel->getDevicesGridListCount($unassigned);
		}else{
			$arrDevices		= 	$objDevicesModel->DevicesGridListDataAll( $sortOrder, $offsetValue, $recordsPerPage, $sortColName);
			$arrDevicesCount		= 	$objDevicesModel->getDevicesGridListAllCount();

		}
		

		for ($i=0; $i < sizeof($arrDevices); $i++) { 
			if($arrDevices[$i]['active'] == 0 ){
				$arrDevices[$i]['active'] = "Unassigned";
			}else{
				$arrDevices[$i]['active'] = "Assigned";
			}
		}
		$arrDeviceParent['total']= $arrDevicesCount;
		$arrDeviceParent['per_page']= $recordsPerPage;
		$totalpages = $arrDevicesCount / $recordsPerPage;

		if (is_float($totalpages)) {
			$totalpages = (int) $totalpages + 1;
			$arrDeviceParent['last_page']=$totalpages;
		}else{
			$arrDeviceParent['last_page']=$totalpages;

		}
		$arrDeviceParent['from']=$offsetValue;
		if ($arrDeviceParent['current_page'] == $arrDeviceParent['last_page']) {
			$arrDeviceParent['to']= $arrDeviceParent['total'];
			
		}else{
			$arrDeviceParent['to']= $offsetValue+9;
		}
		$arrDeviceParent['data']=$arrDevices;

		echo json_encode($arrDeviceParent);

	}

	public function getProducersGridList()
	{
		$objProducerModel = new Producer();
		$sortColName	 			= 	Input::get('_sidx');
		$sortOrder 					= 	Input::get('_sord');
		$input = Input::all();
		$recordsPerPage = 10;  //Records per page
		if(Input::has('_page')){
		$arrParent['current_page'] = Input::get('_page'); // Curent page of teh pagination grid;
		}else{
		$arrParent['current_page'] = 1;
		}
		$offsetValue = (Input::get('_page')*$recordsPerPage)-($recordsPerPage); //Calculating the offset value for the data to be rertieved

		if ($offsetValue < 0) {
			$offsetValue = 0; //Set offset value 1 when the 1st page is called as it is the negative value.
		}


		if (Session::get('ROLE') == "Orion Super Admin" || Session::get('ROLE') == "Administrator" ) {
			$arrData		= 	$objProducerModel->ProducersGridListData( $sortOrder, $offsetValue, $recordsPerPage, $sortColName);
			$arrDataCount		= 	$objProducerModel->getProducerGridListCount();
		}
		
		$arrParent['total']= $arrDataCount;
		$arrParent['per_page']= $recordsPerPage;
		$totalpages = $arrDataCount / $recordsPerPage;

		if (is_float($totalpages)) {
			$totalpages = (int) $totalpages + 1;
			$arrParent['last_page']=$totalpages;
		}else{
			$arrParent['last_page']=$totalpages;

		}
		$arrParent['from']=$offsetValue;
		if ($arrParent['current_page'] == $arrParent['last_page']) {
			$arrParent['to']= $arrParent['total'];
			
		}else{
			$arrParent['to']= $offsetValue+9;
		}
		$arrParent['data']=$arrData;

		echo json_encode($arrParent);


	}

	public function getMoviesGridList()
	{
		$objMoviesModel = new Movies();
		$sortColName	 			= 	Input::get('_sidx');
		$sortOrder 					= 	Input::get('_sord');
		$input = Input::all();
		$recordsPerPage = 10;  //Records per page
		if(Input::has('_page')){
		$arrParent['current_page'] = Input::get('_page'); // Curent page of teh pagination grid;
		}else{
		$arrParent['current_page'] = 1;
		}
		$offsetValue = (Input::get('_page')*$recordsPerPage)-($recordsPerPage); //Calculating the offset value for the data to be rertieved

		if ($offsetValue < 0) {
			$offsetValue = 0; //Set offset value 1 when the 1st page is called as it is the negative value.
		}

		$arrData      = 	$objMoviesModel->MoviesGridListData( $sortOrder, $offsetValue, $recordsPerPage, $sortColName);
		$arrDataCount = 	$objMoviesModel->MoviesGridListDataCount();
	
		$arrParent['total']= $arrDataCount;
		$arrParent['per_page']= $recordsPerPage;
		$totalpages = $arrDataCount / $recordsPerPage;

		if (is_float($totalpages)) {
			$totalpages = (int) $totalpages + 1;
			$arrParent['last_page']=$totalpages;
		}else{
			$arrParent['last_page']=$totalpages;

		}
		$arrParent['from']=$offsetValue;
		if ($arrParent['current_page'] == $arrParent['last_page']) {
			$arrParent['to']= $arrParent['total'];
			
		}else{
			$arrParent['to']= $offsetValue+9;
		}
		$arrParent['data']=$arrData;

		echo json_encode($arrParent);


	}

}