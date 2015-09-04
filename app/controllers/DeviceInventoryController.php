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
	public function getAllDevicesList()
	{
		return View::make('listAllDevices', array(
							'title' => 'Devices',
							'sub_title' => 'Manage Devices',
							'description' => 'Manage Subscribers below.' 
							)
	   					 );
	}

	/**
	 * get the Assigning of the device form for the Subscribers and devices
	 * @author Tej Parekh 
	 * @return View Form with tables from GridTablesController for the Subscribers and the Devices details 
	 */
	public function getAssignDeviceForm()
	{
		$input = Input::all();
		print_r($input);
		$user_id = $input['user_id'];
		$device_id = $input['device_id'];
			try {
			$regValidator = Validator::make( $input, array(
					'user_id' => 'required',
					'device_id' => 'required'

				));
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}

			if ($regValidator->passes() ) {

				$subsciber = Subscribers::where('user_id',$user_id)->first();
				$subsciber->device_id = $input['device_id'];
				$subsciber->save();

				$device = Device::find($device_id);
				$device->active = 1;
				$device->save();

				if ($subsciber->id && $device->id) {
					return Redirect::to('/subscribers-list')->with('message','New device successfully assigned to the subscriber.');
				}else{
					return Redirect::back()->with('error', "Falied to assign the device.")->withInput();
				}

			} else {
					return Redirect::back()->with('error', "Validation Failed.")->withInput();
			}
			die;

		} catch (Exception $e) {
			print_r($e->getMessage());
		}


	}

	/**
	 * Delete the device from the ecosystem.
	 * @author Tej Parekh		
	 * @return Redirect 
	 */
	public function deleteDevicePermanently()
	{
		$input = Input::all();
		try {
			if (!empty($input['id'])) {
					$devDelete = DB::table('devices')->where('id',$input['id'])->delete();
					return Redirect::to('/devices-list')->with('message','Successfully deleted device.' );
				}	
        }catch(Exception $e){
        	return Redirect::to('/devices-list')->with('error','Error deleting the device. '. $e->getMessage() );
		}

	}

	/**
	 * Get the edit form for the devices page
	 * @author Tej Parekh <[<email address>]>
	 * @return View Return the model form for the editing of the devices page.
	 */
	public function getEditDeviceDetails()
	{
		$input = Input::all();
		if (!empty($input['id'])) {
			$objDevice = new Device();
			$arrDeviceData = $objDevice->getSingleDeviceForEdit($input['id']);
			return View::make('editDeviceForm', array(
							'title' => 'Devices',
							'sub_title' => 'Edit Devices',
							'description' => 'Fill the following form to update the device details.' ,
							'formData' => $arrDeviceData,
							'device_id' => $input['id']
							)
	   					 );

			
		}

	}

	/**
	 * Update the Device details 
	 * @author Tej Parekh <[<email address>]>
	 * @return Redirect to the manage devices page
	 */
	public function doUpdateDeviceInventory()
	{
		$input = Input::all();
		print_r($input);

		try {
			$regValidator = Validator::make( $input, array(
					'model' => 'required',
					'imei'=> 'required'

				));
			if ($regValidator->passes() ) {
				$device = Device::find($input['device_id']);

				$device->model = $input['model'];
				$device->os_version = $input['os_version'];
				$device->kernel_version = $input['kernel_version'];
				$device->software_build_number = $input['software_build_number'];
				$device->imei = $input['imei'];
				$device->save();
				if ($device->id) {
					return Redirect::to('/devices-list')->with('message','Successfully updated new device.');
				}else{
					return Redirect::back()->with('error', "Failed to update the device. Please check device details. ".implode($reasonData) )->withInput();
				}

			} else {
					return Redirect::back()->with('error', "Validation Failed. Please check device details. ".implode($reasonData) )->withInput();
			}
					die;

		} catch (Exception $e) {
			print_r($e->getMessage());
			die;
		}
	}
}