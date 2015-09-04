<?php
/**
 * @author Tej Parekh <tejparekh2402@gmail.com>	
 * Date : 19 Aug 2015
 * Registration controller for all the users type in the orion dashboard. 
 */
class RegistrationController extends BaseController
{
	
	public function __construct()
	{
	}

	/**
	 * Get the login page that is called from the routes.php file. 
	 * the respective method that is claimed by the route is called
	 * @return [type] [description]
	 */
	public static function getLoginPage	()
	{
		return View::make('login.loginPage');
	}

	public function getSubscriberRegisteration()
	{
		return View::make('subscriberRegisteration', array(
							'title' => 'Subscribers',
							'sub_title' => 'Add new Subscriber',
							'description' => 'Fill following form to register new subscriber' 
							)
	   					 );
	}

	public function doRegisterSubscriber()
	{
		$input = Input::all();
		// print_r($input);
		try {
			$regValidator = Validator::make($input, array(
										    	'username' => 'required|min:5|unique:users',
										        'first_name' => 'required',
												'roles'	=> 'required',
												'gender' => 'required',
			    							)
										);
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}
			if ($regValidator->passes() ) {
				
				$token = HelperClass::randomToken();
			
						$user 					= new User();
						$user->first_name		= trim($input['first_name']);
						$user->last_name 		= trim($input['last_name']);
						
						$user->username			= $input['username'];
						
						$password 				= $input['password'];
						$user->password			= Hash::make($password);
						
						$user->avatar		= 'uploads/avatar/default_male.png';

						$user->active			= 0;
						$user->role_id			= $input['roles'];
						$user->gender			= @$input['gender'];
						
						$user->created_by		= Session::get('userid');
						if (Input::has('dob')) {
						$input['dob'] = date("Y-m-d", strtotime($input['dob']));
						$user->date_of_birth	= $input['dob'];
						}
						$user_id = $user->save();

						print_r($user->id);
						
						$subscriber = new Subscribers();
						
						$subscriber->user_id = $user->id;
						$subscriber->device_id = null ;
						$subscriber->save();

						if ($subscriber->id) {
							return Redirect::to('/register-subscriber')->with('message','Subscriber successfully registered.');
						} else {
							return Redirect::to('/register-subscriber')->with('error','Failed to enroll the subscriber.');
						}
						


			} else {
				return Redirect::back()->with(array( 'error'=> 'Failed! '.implode($reasonData) ) )->withInput(Input::except('password') );
			}

		} catch (Exception $e) {
			return Redirect::back()->with(array( 'error'=>  $e->getMessage() ) )->withInput(Input::except('password') );
			print_r( );
		}
		
	}

	public function getSubscribersList()
	{
		return View::make('listSubscribers', array(
							'title' => 'Subscribers',
							'sub_title' => 'Manage Subscribers',
							'description' => 'Manage Subscribers below.' 
							)
	   					 );
	}

	public function openForAllRegisterPage()
	{
		return View::make('login.open-register', array(
							'title' => 'Register',
							'sub_title' => 'Producers/Subscribers Registration',
							'description' => 'Producers can initially register here and then they will have to verify their account and othe details.' 
							)
	   					 );
	}
	/**
	 * Open registration of the Producer.
	 * @return [type] [description]
	 */
	public function doOpenForAllRegisterPage()
	{
		$input = Input::all();
		print_r($input);
		try {
			$regValidator = Validator::make($input, array(
												'username'    => 'required|min:5|unique:users',
												'first_name'  => 'required',
												'last_name'   => 'required',
												'roles'       => 'required',
												'mail_id'     => 'required',
												'contact_num' => 'required'
			    							)
										);
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}

			if ($regValidator->passes() ) {
				
				$token = HelperClass::randomToken();
			
						$user 					= new User();
						$user->first_name		= trim($input['first_name']);
						$user->last_name 		= trim($input['last_name']);
						$user->username			= $input['username'];
						$password 				= 'orion123';
						$user->password			= Hash::make($password);
						$user->active			= 0;
						$user->role_id			= $input['roles'];
						$user->completed_profile= FALSE;
						$user->created_by		= 0;
						$user_id = $user->save();

						if ($user->id) {
							$producer          = new Producer();
							$producer->user_id = $user->id;
							$producer->save();

							$addressContacts             = new AddressContacts();
							$addressContacts->mobile_otp = $input['contact_num'];
							$addressContacts->email_id   = $input['mail_id'];
							$addressContacts->save();

							$bankDetails             = new BankDetails();
							$bankDetails->user_id = $user->id;
							$bankDetails->save();

							$updateUser = User::find($user->id);

							$updateUser->address_contact_id = $addressContacts->id;

							$updateUser->save();

							if ($producer->id) {
								return Redirect::to('/')->with('message','Successfully registered.');
							} else {
								return Redirect::to('/pre-register')->with('error','Failed to register.'.implode($reasonData) );
							}
						}else{
								return Redirect::to('/pre-register')->with('error','Failed to register.'.implode($reasonData) );
						}
						
						


			} else {
				return Redirect::back()->with(array( 'error'=>  'Failed to register! '. implode($reasonData) ) )->withInput(Input::except('password') );
			}

		} catch (Exception $e) {
			return Redirect::back()->with(array( 'error'=>  $e->getMessage() ) )->withInput(Input::except('password') );
			print_r( );
		}
	}

	/**
	 * Open registration of the subscriber.
	 * @return [type] [description]
	 */
	public function doOpenForSubscriberRegistration()
	{
		$input = Input::all();
		print_r($input);
		try {
			$regValidator = Validator::make($input, array(
										    	'username' => 'required|min:5|unique:users',
										        'first_name' => 'required',
										        'last_name' => 'required',
												'roles'	=> 'required',
			    							)
										);
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}

			if ($regValidator->passes() ) {
				
				$token = HelperClass::randomToken();
						
						$user 					= new User();
						$user->first_name		= trim($input['first_name']);
						$user->last_name 		= trim($input['last_name']);
						$user->username			= $input['username'];
						$password 				= 'orion123';
						$user->password			= Hash::make($password);
						$user->active			= 0;
						$user->role_id			= $input['roles'];
						$user->completed_profile= FALSE;
						
						
						$user->created_by		= 0;
						
						$user_id = $user->save();
						if ($user->id) {
							$producer = new Producer();
						
							$producer->user_id = $user->id;
							$producer->save();

							if ($producer->id) {
								return Redirect::to('/pre-register')->with('message','Successfully registered.');
							} else {
								return Redirect::to('/pre-register')->with('error','Failed to register.'.implode($reasonData) );
							}
						}else{
								return Redirect::to('/pre-register')->with('error','Failed to register.'.implode($reasonData) );
						}
						
						


			} else {
				return Redirect::back()->with(array( 'error'=>' Vaildation Failed!'. implode($reasonData) ) )->withInput(Input::except('password') );
			}

		} catch (Exception $e) {
			return Redirect::back()->with(array( 'error'=>  $e->getMessage() ) )->withInput(Input::except('password') );
		}
	}
	public function editSubscriberData()
	{
		$input = Input::all();
		if (!empty($input['id'])) {
			$objSubscriber = new Subscribers();
			$arrSubscriberData = $objSubscriber->getSingleSubscriberForEdit($input['id']);
			return View::make('editSubscriberForm', array(
							'title' => 'Subscribers',
							'sub_title' => 'Edit Subscriber',
							'description' => 'Fill the following form to update the subscriber details.' ,
							'formData' => $arrSubscriberData,
							'user_id' => $input['id']
							)
	   					 );

			
		}

	}
	public function updateSubscriberData()
	{
		$input = Input::all();
			try {
			$regValidator = Validator::make($input, array(
										    	'username' => 'required|min:5',
										        'first_name' => 'required',
												'gender' => 'required',
			    							)
										);
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}
			if ($regValidator->passes() ) {
						$user 					= User::find($input['user_id']);
						$user->first_name		= trim($input['first_name']);
						$user->last_name 		= trim($input['last_name']);
						
						$user->username			= $input['username'];
						
						// $password 				= $input['password'];
						// $user->password			= Hash::make($password);
						
						// $user->avatar		= 'uploads/avatar/default_male.png';

						$user->gender			= @$input['gender'];
						
						if (!empty($input['dob'])) {
						$input['dob'] = date("Y-m-d", strtotime($input['dob']));
						$user->date_of_birth	= $input['dob'];
						}
						$user->save();

						if ($user->id) {
							return Redirect::to('/subscribers-list')->with('message','Successfully updated subscriber details.' );
						}else{
							return Redirect::to('/subscribers-list')->with('error','Failed to update subscriber data.'.implode($reasonData) );
						}
					}
				}catch(Exception $e){
					print_r($e->getMessage());
				}
	}

	public function doDeleteSubscriber()
	{
		$input = Input::all();
		try {
			if (!empty($input['id'])) {
					$userDelete = User::destroy($input['id']);
					$subDelete = DB::table('subscribers')->where('user_id',$input['id'])->update(array(
																							'deleted_at'=>'',
																							'auth_token'=> DB::raw(NULL),
																							'device_id'=>  DB::raw(NULL) 
																							));
					return Redirect::to('/subscribers-list')->with('message','Successfully deleted subscriber details.' );
				}	
        }catch(Exception $e){
        	return Redirect::to('/subscribers-list')->with('error','Error deleting the subscriber. '. $e->getMessage() );
		}
	}

	public function doDeAssignSubscriber()
	{
		$input = Input::all();
		try {
			if (!empty($input['id'])) {
					$subDelete = DB::table('subscribers')->where('user_id',$input['id'])->update(array(
																							'auth_token'=> null ,
																							'device_id'=>  null, 
																							));
					return Redirect::to('/subscribers-list')->with('message','Successfully unassigned device.' );
				}	
        }catch(Exception $e){
        	return Redirect::to('/subscribers-list')->with('error','Error deleting the subscriber. '. $e->getMessage() );
		}
	}
}