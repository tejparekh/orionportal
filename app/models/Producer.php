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
	
	public function getProducerRegDetails($user_id)
	{
		return Producer::select('bank_details.id as bank_details_id','producer.id as producer_id','address_contacts.id as address_contact_ID','users.id as user_id', 'bank_details.bank_name','bank_details.ifsc_code','bank_details.branch_name', 'bank_details.account_num' ,'producer.business_name','producer.estd_certificate','producer.certificate_num','producer.others as producer_others','users.first_name','users.last_name','address_contacts.mobile_otp', 'address_contacts.contact_num','address_contacts.address','address_contacts.email_id' )
															->where('producer.user_id',$user_id)->join('users','producer.user_id','=','users.id')
															->join('address_contacts','users.address_contact_id','=','address_contacts.id')
															->join('bank_details','users.id','=','bank_details.user_id')
															->first()->toArray();
	}
	/**
	 * Get the list of all the Producers for the admin
	 * @param [type] $sortOrder      [description]
	 * @param [type] $offsetValue    [description]
	 * @param [type] $recordsPerPage [description]
	 * @param [type] $sortColName    [description]
	 */
	public function ProducersGridListData($sortOrder, $offsetValue, $recordsPerPage, $sortColName)
	{
		return Producer::select(  DB::raw('CONCAT(users.first_name, " ", users.last_name) AS name') ,'producer.business_name','producer.user_id','producer.estd_certificate','producer.certificate_num')
											->join('users','producer.user_id','=','users.id')
											->where('users.deleted_at' ,'=','0000-00-00 00:00:00')
											->orderBy($sortColName, $sortOrder)
											->skip($offsetValue)
											->take($recordsPerPage)->get()->toArray();
	}
	public function getProducerGridListCount()
	{
		return Producer::select('users.first_name','producer.business_name','producer.user_id','producer.estd_certificate','producer.certificate_num')
											->join('users','producer.user_id','=','users.id')
											->where('users.deleted_at' ,'=','0000-00-00 00:00:00')
											->count();
	}
}