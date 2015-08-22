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
		
	return View::make('dashboard' );

		
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
	public function updateProfileInformation()

	{
		$input = Input::all();
		// print_r($input);
		echo $user_id = Input::get('id');
		$password = $input['password'];
		$current_avatar 	= Input::get('avatar');
		$newImage		=	Input::file('file');
		if (!empty($newImage)) {
			$regValidator = Validator::make($input, array(
									'file' => 'max:2048',
							    )
							);
		}else{
			$regValidator = Validator::make($input, array(
									'first_name' => 'required',
							    	'username' => 'required',
							        'first_name' => 'required',
							        'id' => 'required'
    							)
							);
		}
		

		$responseJson = array($input);			
		if($regValidator->passes()){
			try{
				/*Update the "username" in the session to display everywhere correctly*/
				Session::put('username',$input['first_name']);
				Session::put('lastname',$input['last_name']);
				if (Session::get('ROLE')=="ORGANISATION_ADMIN" || Session::get('ROLE')=="COMMUNITY_ADMIN" || Session::get('ROLE')=="ITL_ADMIN") {
					/*Change the Make visible state of the Community of Provider Admin */
					if (Input::has ( 'display_to_client' ) && Session::get('ROLE') == "ORGANISATION_ADMIN" ) {
						DB::table ( 'provider_admin' )->where ( 'user_id', Input::get ( 'id' ) )->update ( array (
								'display_to_client' => Input::get ( 'display_to_client' ) 
						) );
					}
					elseif (Input::has ( 'display_to_client' ) && Session::get('ROLE') == "COMMUNITY_ADMIN") {
						DB::table ( 'community_admin' )->where ( 'user_id', Input::get ( 'id' ) )->update ( array (
								'display_to_client' => Input::get ( 'display_to_client' ) 
						) );
					}elseif (Session::get('ROLE') == "ORGANISATION_ADMIN" && !isset($input['display_to_client'])) {
						DB::table ( 'provider_admin' )->where ( 'user_id', Input::get ( 'id' ) )->update ( array (
								'display_to_client' => FALSE
						) );
					}
					else{
						DB::table ( 'community_admin' )->where ( 'user_id', Input::get ( 'id' ) )->update ( array (
								'display_to_client' => FALSE
						) );
					}

					if (!empty($newImage) && empty($password)) {

					$current_avatar = substr($current_avatar, 0, strpos($current_avatar, "?"));
						$current_avatar = str_replace("\\","/",$current_avatar);
						@$tempString = explode('/', $current_avatar);
						print_r(@$tempString);
						@$oldLogoName = explode('.', @$tempString[2]);
						print_r(@$oldLogoName[0]);
					if ($oldLogoName[0] == "default_pic") {
							
						}else{
								$deleteflag = File::delete(@$current_avatar);
						}

					$destinationPath = 'uploads/avatar/';
					$filename = $newImage->getClientOriginalName();
					$extension =$newImage->getClientOriginalExtension();
					$filename = $input['username'].'.'.$extension;
					$uploadSuccess = Input::file('file')->move($destinationPath, $filename);
					$uploadSuccess = Auth::user()->avatar = $uploadSuccess;

					$uploadSuccess 		= $uploadSuccess . '?' . date ( 'h:i:s', time () );
					Session::put('userphoto', $uploadSuccess);
					
					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'avatar'	=> $uploadSuccess,
								            	'updated_by'=> Session::get('userid')));
					HelperClass::activityLog($user_id, json_encode($input));
					return Redirect::to('/editprofile')->with('message', 'Successfully updated your information.');

				}
				elseif (Input::has('password') && empty($newImage)) {
					$password = $input['password'];
					$password = Hash::make($password);
					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'password'	=> $password,
								            	'updated_by'=> Session::get('userid')));
					 HelperClass::activityLog($user_id, json_encode($input));           
					return Redirect::to('/editprofile')->with('message', 'Successfully updated your information.');
				}
				elseif (Input::has('password') && !empty($newImage) ) {
					$current_avatar = substr($current_avatar, 0, strpos($current_avatar, "?"));
						$current_avatar = str_replace("\\","/",$current_avatar);
						@$tempString = explode('/', $current_avatar);
						print_r(@$tempString);
						@$oldLogoName = explode('.', @$tempString[2]);
						print_r(@$oldLogoName[0]);
					if ($oldLogoName[0] == "default_pic") {
							
						}else{
								$deleteflag = File::delete(@$current_avatar);
						}

					$destinationPath = 'uploads/avatar/';
					$filename = $newImage->getClientOriginalName();
					$extension =$newImage->getClientOriginalExtension();
					$filename = $input['username'].'.'.$extension;
					$uploadSuccess = Input::file('file')->move($destinationPath, $filename);
					$uploadSuccess = Auth::user()->avatar = $uploadSuccess;

					$uploadSuccess 		= $uploadSuccess . '?' . date ( 'h:i:s', time () );
					Session::put('userphoto', $uploadSuccess);

					$password = $input['password'];
					$password = Hash::make($password);
					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'avatar'	=> $uploadSuccess,
								            	'password'	=> $password,
								            	'updated_by'=> Session::get('userid')));
					 HelperClass::activityLog($user_id, json_encode($input));           
					return Redirect::to('/editprofile')->with('message', 'Successfully updated your information.');
				}
				else{
					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'updated_by'=> Session::get('userid')));
					 HelperClass::activityLog($user_id, json_encode($input));           
					return Redirect::to('/editprofile')->with('message', 'Successfully updated your information.');
				}



				} else{
					if (!empty($newImage)&& !(Input::has('password')) ) {
						$current_avatar = substr($current_avatar, 0, strpos($current_avatar, "?"));
						$current_avatar = str_replace("\\","/",$current_avatar);
						@$tempString = explode('/', $current_avatar);
						print_r(@$tempString);
						@$oldLogoName = explode('.', @$tempString[2]);
						print_r(@$oldLogoName[0]);
					if ($oldLogoName[0] == "default_pic") {
							
						}else{
								$deleteflag = File::delete(@$current_avatar);
						}

					$destinationPath = 'uploads/avatar/';
					$filename = $newImage->getClientOriginalName();
					$extension =$newImage->getClientOriginalExtension();
					$filename = $input['username'].'.'.$extension;
					$uploadSuccess = Input::file('file')->move($destinationPath, $filename);

					$uploadSuccess = Auth::user()->avatar = $uploadSuccess;

					$uploadSuccess 		= $uploadSuccess . '?' . date ( 'h:i:s', time () );
					Session::put('userphoto', $uploadSuccess);

					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'avatar'	=> $uploadSuccess,
								            	'updated_by'=> Session::get('userid')));
				}
				if (Input::has('password') && !empty($newImage) ) {
					
					$current_avatar = substr($current_avatar, 0, strpos($current_avatar, "?"));
						$current_avatar = str_replace("\\","/",$current_avatar);
						@$tempString = explode('/', $current_avatar);
						print_r(@$tempString);
						@$oldLogoName = explode('.', @$tempString[2]);
						print_r(@$oldLogoName[0]);
					if ($oldLogoName[0] == "default_pic") {
							
						}else{
								$deleteflag = File::delete(@$current_avatar);
						}
						
					$destinationPath = 'uploads/avatar/';
					$filename = $newImage->getClientOriginalName();
					$extension =$newImage->getClientOriginalExtension();
					$filename = $input['username'].'.'.$extension;
					$uploadSuccess = Input::file('file')->move($destinationPath, $filename);

					$uploadSuccess = Auth::user()->avatar = $uploadSuccess;

					$uploadSuccess 		= $uploadSuccess . '?' . date ( 'h:i:s', time () );
					Session::put('userphoto', $uploadSuccess);

					$password = $input['password'];
					$password = Hash::make($password);
					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'avatar'	=> $uploadSuccess,
								            	'password'	=> $password,
								            	'updated_by'=> Session::get('userid')));
				}
				
				if (Input::has('password') || Input::has('phone1') || Input::has('phone2')|| Input::has('email2')  || Input::has('email1')) {
					$password = $input['password'];
					$password = Hash::make($password);
					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'password'	=> $password,
								            	'updated_by'=> Session::get('userid')));
					DB::table('companions')
					            ->where('user_id',$user_id )
					            ->update(array('phone1' => $input['phone1'],
								            	'phone2' => $input['phone2'],
								            	'email2' 	=> $input['email2'],
								            	'skype_id'	=> $input['skype_id'],
								            	'updated_by'=> Session::get('userid')));
					

				}
				else{
					DB::table('users')
					            ->where('id',$user_id )
					            ->update(array('first_name' => $input['first_name'],
								            	'last_name' => $input['last_name'],
								            	'username'  => $input['username'],
								            	'location' 	=> $input['location'],
								            	'updated_by'=> Session::get('userid')));

				}
				HelperClass::activityLog($user_id, json_encode($input));
				return Redirect::to('/editprofile')->with('message', 'Successfully updated your information.');

				}
				
				
					//Image::make(Input::file('photo')->getRealPath())->resize(300, 200)->save('foo.jpg');
				
						
					
			}catch(Exception $e){
				print_r($e->getTraceAsString());
				$responseJson = json_encode(array("status_code" => 500,"status_message"=>"Internal Server Error","data"=>array("Reason"=>$e->getMessage())));
			}
		}else{
			echo "Validation Failed";
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}
			$responseJson = json_encode(array("status_code" => 400,"status_message"=>"Validation Failure","data"=>array("Reason"=>$reasonData)));
		
		return Redirect::to('/editprofile')->with('error', 'Please fill the form properly. Image size should be less than 2M.');
	}

	}
}