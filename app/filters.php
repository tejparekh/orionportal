<?php

/*
|--------------------------------------------------------------------------
| Application & Route Filters
|--------------------------------------------------------------------------
|
| Below you will find the "before" and "after" events for the application
| which may be used to do any work before or after a request into your
| application. Here you may also register your custom route filters.
|
*/

App::before(function($request)
{
	$arrHeaders	= array('Cache-Control'=>'no-cache, no-store, max-age=0, must-revalidate','Pragma'=>'no-cache','Expires'=>'Fri, 01 Jan 1990 00:00:00 GMT');
    View::share('headers', $arrHeaders);
});


App::after(function($request, $response)
{
	//
});

/*
|--------------------------------------------------------------------------
| Authentication Filters
|--------------------------------------------------------------------------
|
| The following filters are used to verify that the user of the current
| session is logged into this application. The "basic" filter easily
| integrates HTTP Basic authentication for quick, simple checking.
|
*/

Route::filter('auth', function()
{
	if (array_key_exists('HTTP_X_REQUESTED_WITH', $_SERVER)) {
		if(strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
			$response = array('session_out'=> 'true');
			if (Auth::guest()) return json_encode($response);
		}
	}
	else{
		if (Auth::guest()) return Redirect::guest('/')->with('flash_error', 'You must be logged in to view this page!');
	}
	
});

Route::filter(
'ONLY_OA', function()
{
	$strRole	= Session::get('ROLE');
	if($strRole	!= "ITL_ADMIN")
	{
		App::abort(404);
	}
});

Route::filter(
'OA_P', function()
{
	$strRole	= Session::get('ROLE');
	if($strRole	!= "ITL_ADMIN")
	{
		App::abort(404);
	}
});
Route::filter(
'OA_P_D', function()
{
	$strRole	= Session::get('ROLE');
	if($strRole	!= "ITL_ADMIN")
	{
		App::abort(404);
	}
});
Route::filter(
'OA_P_D_SD', function()
{
	$strRole	= Session::get('ROLE');
	if($strRole	!= "ITL_ADMIN")
	{
		App::abort(404);
	}
});
Route::filter(
'ONLY_P', function()
{
	$strRole	= Session::get('ROLE');
	if($strRole	!= "ITL_ADMIN")
	{
		App::abort(404);
	}
});



Route::filter('auth.basic', function()
{
	return Auth::basic();
});

/*
|--------------------------------------------------------------------------
| Guest Filter
|--------------------------------------------------------------------------
|
| The "guest" filter is the counterpart of the authentication filters as
| it simply checks that the current user is not logged in. A redirect
| response will be issued if they are, which you may freely change.
|
*/

Route::filter('guest', function()
{
	if (Auth::check()) return Redirect::to('/');
});

/*
|--------------------------------------------------------------------------
| CSRF Protection Filter
|--------------------------------------------------------------------------
|
| The CSRF filter is responsible for protecting your application against
| cross-site request forgery attacks. If this special token in a user
| session does not match the one given in this request, we'll bail.
|
*/

Route::filter('csrf', function()
{
	if (Session::token() != Input::get('_token'))
	{
		throw new Illuminate\Session\TokenMismatchException;
	}
});
