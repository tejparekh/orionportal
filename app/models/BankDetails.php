<?php
/**
    * @ author Tej
	* @ date 01 Sept 2015
	* THe Bank Details Role
*/
class BankDetails extends Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'bank_details';

	/**
	 * The attributes excluded from the model's JSON form.
	 * @var array
	 */
	protected $hidden = array('');
	
	/**
	 * ret
	 * @var array
	 */
	// public function getRoleDetails($id)
	// {
	// 	if(empty($id))
	// 	{
	// 		throw new Exception('invalid parameter passed');
	// 	}
	// 	$arrRole	= Role::where('id', '=', $id)->firstOrFail()->toArray();
	// 	return $arrRole;
	// }



}