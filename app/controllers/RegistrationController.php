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
		print_r($input);
		try {
			$regValidator = Validator::make($input, array(
										    	'username' => 'required|min:5',
										        'first_name' => 'required',
												'roles'	=> 'required',
												'gender' => 'required',
			    							)
										);
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
				return Redirect::back()->with(array( 'error'=>  $regValidator->messages() ) )->withInput(Input::except('password') );
			}

		} catch (Exception $e) {
			return Redirect::back()->with(array( 'error'=>  $e->getMessage() ) )->withInput(Input::except('password') );
			print_r( );
		}
		
	}


}