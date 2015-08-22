<?php
/**
 * @author Tej Parekh <tejparekh2402@gmail.com>	
 * Date : 19 Aug 2015
 * Registration controller for all the users type in the orion dashboard. 
 */
class DeviceInventoryController extends BaseController
{
	
	public function __construct()
	{

	}

	public function getAddDeviceInventory()
	{
		return View::make('deviceRegisteration', array(
							'title' => 'Devices',
							'sub_title' => 'Add new Device',
							'description' => 'Fill following form to register new device. The device then can be assigned to any subsciber.' 
							)
	   					 );

	}

	public function doAddDeviceInventory()
	{
		$input = Input::all();
		print_r($input);

		try {
			$regValidator = Validator::make( $input, array(
					'model' => 'required',

				));
			if ($regValidator->passes() ) {
				$device = new Device();

				$device->model = $input['model'];
				$device->os_version = $input['os_version'];
				$device->kernel_version = $input['kernel_version'];
				$device->software_build_number = $input['build_number'];
				$device->imei = $input['imei'];
				$device->save();
				if ($device->id) {
					return Redirect::to('/register-device')->with('message','Successfully registerd new device.');
				}else{
					return Redirect::back()->with('error', "Failed to register the device. Please check device details.")->withInput();
				}

			} else {
					return Redirect::back()->with('error', "Validation Failed. Please check device details.")->withInput();
			}
					die;

		} catch (Exception $e) {
			print_r($e->getMessage());
		}
	}
}