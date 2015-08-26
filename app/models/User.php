<?php

use Illuminate\Auth\UserInterface;

class User extends Eloquent implements UserInterface	 {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';
	protected $softDelete 	= true;
	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');

	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	public function getRememberToken()
	{
		return $this->getKey();
	}
	public function setRememberToken($value)
	{
		return $this->getKey();
	}
	public function getRememberTokenName()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}
	
	public function getProfileCompleteState($user_id)
	{
		$result = DB::table('users')->select('completed_profile')->where('id',$user_id)->get();
		foreach ($result as $user)
		{
			$data = $user->completed_profile;
		}
		return $data;
	}
}