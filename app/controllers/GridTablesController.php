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

}