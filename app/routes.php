<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
Route::get('/', 'RegistrationController@getLoginPage');
Route::post('/authenticate', 'AuthController@doLogin');
Route::get('/dashboard',array('before'=>'auth','uses'=>'DashboardController@getDashboardPage') );

Route::get('/logout','AuthController@doLogout');

Route::get('/register-subscriber',array('before'=>'auth','uses'=>'RegistrationController@getSubscriberRegisteration') );
Route::post('/addsubscriber',array('before'=>'auth','uses'=>'RegistrationController@doRegisterSubscriber') );
Route::get('/register-device',array('before'=>'auth','uses'=>'DeviceInventoryController@getAddDeviceInventory') );
Route::post('/add-device',array('before'=>'auth','uses'=>'DeviceInventoryController@doAddDeviceInventory') );


// Services 
Route::post('/activatedevice', 'DeviceAuthorizationController@doActivateDevice');


