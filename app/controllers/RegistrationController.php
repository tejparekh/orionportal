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
}