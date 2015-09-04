<?php
/**
    * @ author Tej
	* @ date 22 Aug 2015
	* Device model
*/
class Device extends Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'devices';

	/**
	 * The attributes excluded from the model's JSON form.
	 * @var array
	 */
	protected $hidden = array('');

	public function getAvailIMEIforAuth($imei)
	{
		return $availDevice = Device::select('id')
							->where('imei',trim($imei) )
							->first();

	}

	public function DevicesGridListData($sortOrder, $offsetValue, $recordsPerPage, $sortColName,$unassigned = null)
	{
		return Device::select('devices.model','devices.id','devices.kernel_version','devices.os_version','devices.imei','devices.active')
											->where('devices.active',$unassigned)
											->orderBy($sortColName, $sortOrder)
											->skip($offsetValue)
											->take($recordsPerPage)->get()->toArray();

	}

	public function getDevicesGridListCount ($unassigned)
	{
		return $arrSubscribers = DB::table('devices')
											->select('devices.model','devices.id','devices.kernel_version','devices.os_version')
											->where('devices.active',$unassigned)
											->count();

	}

	public function DevicesGridListDataAll($sortOrder, $offsetValue, $recordsPerPage, $sortColName)
	{
		return Device::select('devices.model','devices.id','devices.kernel_version','devices.os_version','devices.imei','devices.active')
											->orderBy($sortColName, $sortOrder)
											->skip($offsetValue)
											->take($recordsPerPage)->get()->toArray();

	}
	public function getDevicesGridListAllCount ()
	{
		return $arrSubscribers = DB::table('devices')
											->select('devices.model','devices.id','devices.kernel_version','devices.os_version')
											->count();

	}

	public function getSingleDeviceForEdit($device_id)
	{
		return Device::where('devices.id',$device_id)
											->where('devices.deleted_at' ,'=','0000-00-00 00:00:00')
											->first()->toArray();
	}

}