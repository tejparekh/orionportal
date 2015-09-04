<?php 

/**
* @author Tej Parekh <[<email address>]>
* @date 02 Sept 2015
* For managing the producer details himself of the Orion admins to change that info.
* 
*/
class ProducerController extends BaseController
{
	
	public function __construct()
	{
	}

	/**
	 * Get the edit value details of the Produer registration data
	 * @author Tej Parekh <[<email address>]>
	 * @return [View] [description]
	 */
	public function getEditProducerRegitrationDetails()
	{
		if (Session::get('ROLE') == "Producer"  ) {
			$user_id = Session::get('userid'); // logged in user id of the producer
			$producerReg = new Producer();
			$producerDetails = $producerReg->getProducerRegDetails($user_id);
			if (!empty($producerDetails)) {
				$producerDataAvail = true;
			}else{
				$producerDataAvail = false;
			}
			return View::make('producerEditDetails', array(
							'title' => 'Producer',
							'sub_title' => 'Registration Details',
							'description' => 'Edit the following form to edit the details for the producer.' ,
							'formData' => $producerDetails,
							'dataPresent' => $producerDataAvail
							)
	   					 );
		}
	}

	/**
	 * Update the producer Details with bank, address and other important details 
	 * @author Tej Parekh			
	 * @return Redirect [description]
	 */
	public function updateProducerDetails()
	{
		try{
		$input = Input::all();
		print_r($input);
		$estdCertificate = Input::file('estd_certificate');
		$regValidator = Validator::make($input, array(
												'producer_id'        => 'required',
												'address_contact_ID' => 'required',
												'user_id'            => 'required',
												'first_name'         => 'required',
												'last_name'          => 'required',
												'mobile_otp'         => 'required',
												'address'            => 'required',
												'contact_num'        => 'required',
												'email_id'           => 'required',
												'estd_certificate'   => 'mimes:jpg,jpeg,png,bmp',
												'certificate_num'    => 'required',
												'bank_name'          => 'required',
												'branch_name'        => 'required',
												'ifsc_code'          => 'required',
												'business_name'      => 'required',

			    							)
										);
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}

        	if ($regValidator->passes() ) {	

        		if (!empty($input['user_id']) ) {
        			$user = User::find($input['user_id']);
        			$user->first_name = $input['first_name'];
        			$user->last_name = $input['last_name'];
        			$user->save();
        		}

        		if (!empty($input['producer_id']) ) {

					$producer                  = Producer::find($input['producer_id']);
					$producer->business_name   = $input['business_name'];
					$producer->certificate_num = $input['certificate_num'];
					
        			if (!empty($estdCertificate)) {
        				$destinationPath = 'uploads/estd-certificates/';
						$filename  = $estdCertificate->getClientOriginalName();
						$extension = $estdCertificate->getClientOriginalExtension();
						$uploadCertificate = Input::file('estd_certificate')->move($destinationPath, $filename);
        			}else{
        				$uploadCertificate = null;
        			}

					$producer->estd_certificate = $uploadCertificate;
					$producer->save();

					$addressContacts              = AddressContacts::find($input['address_contact_ID']);
					$addressContacts->mobile_otp  = $input['mobile_otp'];
					$addressContacts->email_id    = $input['email_id'];
					$addressContacts->contact_num = $input['contact_num'];
					$addressContacts->address     = $input['address'];
					$addressContacts->save();

					if (!empty($input['bank_details_id']) ) {
						$bankDetails              = BankDetails::find($input['bank_details_id']);
					}else{
						$bankDetails              = new BankDetails();
						$bankDetails->user_id   = $input['user_id'];
					}
					$bankDetails->bank_name   = $input['bank_name'];
					$bankDetails->ifsc_code   = $input['ifsc_code'];
					$bankDetails->branch_name = $input['branch_name'];
					$bankDetails->account_num = $input['account_num'];
					

					$bankDetails->save();

					return Redirect::to('/producer-details')->with('message','Successfully updated.');
        		}

        	}else{
        		return Redirect::back()->with('error','Please fill form properly. '.implode($reasonData) );
        	}
        }catch (Exception $e){
        	echo $responseJson = json_encode(array("status_code" => 500,"status_message"=>"Internal Server Error","data"=>array("Reason"=>$e->getMessage())));

        }
	}

	/**
	 * Get the list of the Producers to manage.
	 * @return [type] [description]
	 */
	public function getProducersList()
	{
		return View::make('listProducers', array(
							'title' => 'Producers',
							'sub_title' => 'Manage Producers',
							'description' => 'Manage Producers below.' 
							)
	   					 );	
	}
}