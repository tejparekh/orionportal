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

}