<?php 

/**
* 
*/
class DeviceAuthorizationController extends DeviceController
{
	
	public function __construct(Subscribers $subscriber)
	{
		parent::__construct();
		$this->objSubscriberModel	= $subscriber;
	}

	/**
	 * Do activate the subscriber from the tv box. And provide the auth token for the communication 
	 * @return [type] [description]
	 */
	public static function doActivateDevice()
	{
		// header('content-type:application/json');
		try
		{
			$input = Input::all();
			print_r($input);
			$objSubscriberModel = new Subscribers();
			$arrResponse	= array();
			$arrUserInput	=	array(
									'username'=>	strtolower(Input::get('username')),
									'password'=>	Input::get('password'),
								);
			$gcmId		= Input::get('gcm_id');
			$imei		= Input::get('imei');
			//print_r($arrUserInput);
			/*$intUserId	= User::find(Input::get('username'));*/
			if(Auth::once($arrUserInput))
			{
				$intUserId 				= Auth::user()->id;
				$arrCustDetail			= $objSubscriberModel->getSubscriberDetails($intUserId);
				if($arrCustDetail)
				{
					if(!empty($gcmId))
					{
						Device::where('imei','=',trim(Input::get('imei')))->update(array('deleted_at'=>DB::raw('now()')));
						$strDeviceAuthHash					= Hash::make(microtime().Input::get('password'));
						$objDeviceModel						= new Device;
						$objDeviceModel->gcm_id				= Input::get('gcm_id');
						$objDeviceModel->imei				= Input::get('imei');
						$objDeviceModel->current_version	= 0;
						$objDeviceModel->active				= 1;
						$objDeviceModel->save();
						
						Subscribers::where('id', '=', $arrCustDetail[0]['id'])->update(array('device_id'=>$objDeviceModel->id,'auth_token'=>$strDeviceAuthHash));

						$headerDetails 	=	DB::table('users')
													->select('users.avatar','users.first_name')
													->join('subscribers','users.id','=','subscribers.user_id')
													->where('users.id',$intUserId)
													->first();

				
                                               
                                                
						$arrResponse						= array('success'=>1, 'failure'=>0, 'device_token'=>$strDeviceAuthHash,'header'=>$headerDetails,'response'=>'Authentication successful.');
					}else
					{
						$arrResponse		= array('success'=>0, 'failure'=>1, 'device_token'=>'',	'response'=>'Device id is empty.');
					}
				}else
				{
					$arrResponse		= array('success'=>0, 'failure'=>1, 'device_token'=>'','response'=>'No device assigned to user.');
				}
			}else
			{
				$arrResponse			= array('success'=>0, 'failure'=>1, 'device_token'=>'','response'=>'Authentication failed.');
			}
		}catch(Exception $e)
		{
			$arrResponse				= array('success'=>0, 'failure'=>1, 'device_token'=>'','response'=>$e->getMessage());
		}
		echo json_encode($arrResponse);
		die();
	}




}