<?php
/**
    * @ author Tej Parekh
	* @ date 22 Aug 2015
	* Subscribers model (orion tv device, users profile)
*/
class Subscribers extends Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'subscribers';
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
	public function getSubscriberDetails($user_id)
	{
		return Subscribers::select('id')
						 ->where('user_id', '=', $user_id)
						 ->get()->toArray();
	}
	
	/**
	 * get the customer gcm id
	 *
	 * @return mixed
	 */
	public function getCustomerGcm($user)
	{
		return DB::table($this->table)
						->join('devices', 'devices.id', '=', $this->table.'.device_id')
						->whereNull('devices.deleted_at')
						->whereNull('customers.deleted_at')
						->where($this->table.".user_id",'=',$user)
						->get(array('gcm_id'));
			
	}
	
	/**
	 * check customer auth token 
	 * @return mixed
	 */
	public function checkAuthToken($token)
	{
		return Subscribers::select('user_id')
						 ->where('auth_token', '=', $token)
						 ->first();
	}

	/**
	 * Check if customer exist
	 *
	 * @return boolean
	 */
	public function saveAuthToken($user_id)
	{
		if(empty($user_id))
		{
			throw new Exception('invalid parameter passed');
		}
		return Subscribers::where('user_id', '=', $user_id)->toArray();
	}


	public function getSubscribersGridListData ($sortOrder, $offsetValue, $recordsPerPage, $sortColName)
	{
		return $arrSubscribers = DB::table('subscribers')
											->select('users.first_name as name_user','users.id as userID', 'users.username')
											->join('users','subscribers.user_id','=','users.id')
											->skip($offsetValue)
											->take($recordsPerPage)->get();

	}

	public function getSubscribersGridListCount ()
	{
		return $arrSubscribers = DB::table('subscribers')
											->select(DB::raw("users.first_name || ' ' || users.last_name as name_user"),'users.id as userID', 'users.username', 'users.location')
											->join('users','subscribers.user_id','=','users.id')
											->count();

	}

}