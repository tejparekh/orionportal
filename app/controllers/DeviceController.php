<?php

/**
    * @ author Tej
    * @ date 22 Aug 2015
    * serve as the base controller for services for the device.
*/	

class DeviceController extends Controller
{
	protected static $AuthDeviceUser	= null;
	
    public function __construct()
    {
        $strDeviceToken = Input::get('token');
        $strRoute	= Route::getCurrentRoute()->getPath();
        if($strRoute	!= 'activatedevice')
        {
            if(empty($strDeviceToken))
            {
                throw new Exception ("device authentication failed");
            }
            if($arrRes = $this->validateToken($strDeviceToken))
            {
                 self::$AuthDeviceUser	= $arrRes['user_id'];
            }else
            {
                throw new Exception ("device authentication failed");
            }
        } 
    }

    /**
	*validate the token against database
	*@param string
	*@returns mixed (false if validation fails or array containing user detail)
	**/
	protected function validateToken($token)
	{
		$objSubModel	= new Subscribers();
		$arrRes			= $objSubModel->checkAuthToken($token);
		return $arrRes;	
	}


}