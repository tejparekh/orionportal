<?php
/**
    * @ author Tej
	* @ date 21 Aug 2015
	* User dashboard controller
*/	 
class DashboardController extends BaseController 
{
	public function __construct()
	{
	
	}

	/**
	 * @return View
	 * Display the dashboard menu for logged in users
	 */
	public function getDashboardPage()
	{
		$objUser	= new User();
		$UserId = Session::get('userid');

		if ($UserId) {
			$getProfileState = $objUser->getProfileCompleteState($UserId);
			$getProfileData = $objUser->getProfileDataNewLogin($UserId);
			
			
			// if ($getProfileState == 0 ) {
				
				// return View::make('completeProfile', array(
				// 						'title' => 'Profile',
				// 						'sub_title' => 'Complete your Profile',
				// 						'description' => 'Complete your Profile.' ,
				// 						'profileData'=> $getProfileData
				// 						)
				//    					 );
			// }else{
				return View::make('dashboard');
			// }

		}
		

		
	}
	public function getProfileInformation()
	{
		$user_id	=	Session::get('userid');
		$objUser	= new User();
		if (Session::get('ROLE')=="COMPANION_ADMIN") {
			$userInfo	=	DB::table('companions')
								->join('users','companions.user_id','=','users.id')
								->select('users.id','users.first_name','users.last_name','users.username','users.location','users.avatar','companions.phone1','companions.phone2','companions.email1','companions.email2','companions.skype_id')
								->where('companions.user_id',$user_id)
								->first();
			$userInfo['avatar'] = $userInfo['avatar'].'?'.date('h:i:s', time());

		}elseif ( Session::get('ROLE')=="ORGANISATION_ADMIN" ) {
			$userInfo	= DB::table ( 'provider_admin' )
								->select ( 'users.id','users.first_name','users.last_name','users.username','users.location','users.avatar','provider_admin.display_to_client' )
								->join ( 'users', 'provider_admin.user_id', '=', 'users.id' )
								->where ( 'users.id', $user_id )
								->first ();
		}elseif( Session::get('ROLE')=="COMMUNITY_ADMIN" ){
			$userInfo	= DB::table ( 'community_admin' )
								->select ( 'users.id','users.first_name','users.last_name','users.username','users.location','users.avatar','community_admin.display_to_client' )
								->join ( 'users', 'community_admin.user_id', '=', 'users.id' )
								->where ( 'users.id', $user_id )
								->first ();
		}
		else{
			$userInfo	=	DB::table('users')
								->select('id','first_name','last_name','username','location','avatar')
								->where('id',$user_id)
								->first();
			$userInfo['avatar'] = $userInfo['avatar'].'?'.date('h:i:s', time());
		}
		$arrData	= $objUser->getUserAvatar($user_id);
		if($arrData)
		{
			$boolRemoveAvatar	= true;
		}else
		{
			$boolRemoveAvatar	= false;
		}
			
		return View::make('profileInformation',array('user_id' =>$user_id,'remove_avatar'=>$boolRemoveAvatar,'userInfo'=>$userInfo));
	}

	public function doUpdateProfileInformation(){
		$input = Input::all();
		print_r($input);
		die;
	}
}