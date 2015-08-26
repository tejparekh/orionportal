<?php
/**
    * @ author Tej Parekh
	* @ date 22 Aug 2015
	* Subscribers model (orion tv device, users profile)
*/
class Producer extends Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'producer';
	protected $softDelete 	= true;
	/**
	 * The attributes excluded from the model's JSON form.
	 * @var array
	 */
	protected $hidden = array('');
	
	/**
	 * Check if customer exist
	 *
	 * @return mixed
	 */
	

}