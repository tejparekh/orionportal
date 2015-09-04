<?php
/**
    * @ author Arun
	* @ date 3/17/2014
	* User Role model
*/
class Role extends Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'roles';

	/**
	 * The attributes excluded from the model's JSON form.
	 * @var array
	 */
	protected $hidden = array('');

	/**
	 * ret
	 * @var array
	 */
	public function getRoleDetails($id)
	{
		if(empty($id))
		{
			throw new Exception('invalid parameter passed');
		}
		$arrRole	= Role::where('id', '=', $id)->firstOrFail()->toArray();
		return $arrRole;
	}



}