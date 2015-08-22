<?php
/**
* @author Tej Parekh
* @date 22Aug 2015
* This is the global helper class with all the manipulative and default classes to be written
* GCM, token, image manipulation 
*/
class HelperClass
{
	
	function __construct()
	{
		# code...
	}
	
	/* creates random token */
	
	public static function  randomToken() 
	{
		$alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass 	  = ''; 
		$alphaLength = strlen($alphabet)-1;
		for ($i = 0; $i < 8; $i++)
		{
			$n 		=  rand(0, $alphaLength);
			$pass 	.= $alphabet[$n];
		}
		return $pass;
	}

}