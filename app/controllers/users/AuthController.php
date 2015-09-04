<?php
/**
    * @ author Tej
	* @ date 21 Aug 2015
	* User authentication controller
*/	 
class AuthController extends BaseController
{

	/**
	 * @return View
	 * Display the login page
	 */
	public function getLogin()
	{
		if(Auth::user())
		{
			return Redirect::to('/dashboard');
		}
		$strInput		= Input::get('resetpwd');
		$strMsg			= '';
		if($strInput	== 1)
		{
			$strMsg 	= 'Enter the password that was sent to your mail.';
		}
		return View::make('users.auth.login')->with('message',$strMsg);
	}
	
	/**
	 * @return 
	 * Checks whether user is a valid user or not
	 */
	public function doLogin()
	{
		
		$arrUserInput	=	array(
								'username'=> strtolower(Input::get('username')),
								'password'=>  Input::get('password')
							);
		$objValidator	=	Validator::make(
										$arrUserInput,
										array(
											'password' => 'required',
											'username' => 'required'
										),
										array(
											'Username is required.',
											'Password is required.'
										)
							);
		if($objValidator->fails())
		{
			return Redirect::to('/')->withErrors($objValidator)->withInput();
		}

			if (Auth::attempt(array('username' => $arrUserInput['username'], 'password' => $arrUserInput['password'])) )
				{
					$intUserId		= Auth::user()->id;
					$intRole		= Auth::user()->role_id;
					$strUsername 	= Auth::user()->first_name;
					$strLastname 	= Auth::user()->last_name;
					$userPhoto 		= Auth::user()->avatar;
					$userPhoto 		= $userPhoto . '?' . date ( 'h:i:s', time () );
					Session::put('userphoto', $userPhoto);
					Session::put('username', $strUsername);
					Session::put('lastname', $strLastname);
					Session::put('userid', $intUserId);
					if(!empty($intRole))
					{
						$objRoleModel	= new Role();
						$arrRole		= $objRoleModel->getRoleDetails($intRole);
						if(isset($arrRole['name']))
						{
							Session::put('ROLE', trim($arrRole['name']) );
						}
					}

					return Redirect::to('/dashboard');
				}else
				{
					print_r("expression");
					return Redirect::to('/')->with('error', 'Username or password is wrong');
				}
		
	}
	
	/**
	 * @return 
	 * do logout process
	 */
	public function doLogout()
	{
		Auth::logout();
		Session::flush();
		return Redirect::to('/')->with('message', 'Successfully logged out.');
	}

}