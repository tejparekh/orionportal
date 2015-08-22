<?php
/**
    * @ author Arun
	* @ date 3/17/2014
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

	
}