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
Route::get('/pre-register', 'RegistrationController@openForAllRegisterPage');
Route::post('/do-open-register', 'RegistrationController@doOpenForAllRegisterPage');

/*Portal Information*/
Route::get('/dashboard',array('before'=>'auth','uses'=>'DashboardController@getDashboardPage') );
Route::get('/logout','AuthController@doLogout');
Route::post('/update-profile',array('before'=>'auth','uses'=>'DashboardController@doUpdateProfileInformation') );
Route::get('/devices-list', array('before'=>'auth', 'uses' => 'DeviceInventoryController@getAllDevicesList' ) );
Route::get('/producer-details', array('before'=>'auth|ONLY_P', 'uses' => 'ProducerController@getEditProducerRegitrationDetails' ) );
Route::post('/update-producer-details', array('before'=>'auth|ONLY_P', 'uses' => 'ProducerController@updateProducerDetails' ) );

// Movies
Route::post('/doaddmovie',array('before'=>'auth','uses'=>'MoviesController@doAddNewMovie') );
Route::get('/view-movies', array('before'=>'auth|ONLY_P', 'uses' => 'MoviesController@getEditMoviesForm' ) );
Route::post('/setmovie', array('before'=>'auth', 'uses' => 'MoviesController@setMovieToEdit' ) );
Route::post('/doupdatemovie', array('before'=>'auth|ONLY_P', 'uses' => 'MoviesController@doUpdateMovieDetails' ) );
Route::get('/add-movies', array('before'=>'auth', 'uses' => 'MoviesController@getAddNewMoviesForm' ) );
Route::get('/movies-list', array('before'=>'auth', 'uses' => 'MoviesController@getAllMoviesList' ) );
Route::get('/view-movie-data', array('before'=>'auth', 'uses' => 'MoviesController@getSingleMoviesToView' ) );



/*Subscribers*/
Route::get('/subscribers-list', array('before'=>'auth', 'uses' => 'RegistrationController@getSubscribersList' ) );
Route::post('/addsubscriber',array('before'=>'auth','uses'=>'RegistrationController@doRegisterSubscriber') );
Route::get('/register-subscriber',array('before'=>'auth','uses'=>'RegistrationController@getSubscriberRegisteration') );
Route::get('/assign-device',array('before'=>'auth','uses'=>'DeviceInventoryController@getAssignDeviceForm') );
Route::get('/editsubscriber', array('before'=>'auth', 'uses' => 'RegistrationController@editSubscriberData' ) );
Route::post('/doupdatesubscriber',array('before'=>'auth','uses'=>'RegistrationController@updateSubscriberData') );
Route::get('/deletesubscriber',array('before'=>'auth','uses'=>'RegistrationController@doDeleteSubscriber') );
Route::get('/deassigndevice',array('before'=>'auth','uses'=>'RegistrationController@doDeAssignSubscriber') );

/*Devices*/
Route::get('/register-device',array('before'=>'auth','uses'=>'DeviceInventoryController@getAddDeviceInventory') );
Route::post('/add-device',array('before'=>'auth','uses'=>'DeviceInventoryController@doAddDeviceInventory') );
Route::get('/deletedevice',array('before'=>'auth','uses'=>'DeviceInventoryController@deleteDevicePermanently') );
Route::get('/editdevice',array('before'=>'auth','uses'=>'DeviceInventoryController@getEditDeviceDetails') );
Route::post('/update-device',array('before'=>'auth','uses'=>'DeviceInventoryController@doUpdateDeviceInventory') );

/*Producers */
Route::get('/producers-list', array('before'=>'auth', 'uses' => 'ProducerController@getProducersList' ) );


/*Grid Controllers Routes*/
Route::get('/list-grid-subscribers', array('before'=>'auth', 'uses' => 'GridTablesController@getSubscribersGridList') ) ;
Route::get('/list-grid-devices', array('before'=>'auth', 'uses' => 'GridTablesController@getDevicesGridList') ) ;
Route::get('/list-grid-producers', array('before'=>'auth', 'uses' => 'GridTablesController@getProducersGridList') ) ;
Route::get('/list-grid-movies', array('before'=>'auth', 'uses' => 'GridTablesController@getMoviesGridList' ) );


// Services 
Route::post('/activatedevice', 'DeviceAuthorizationController@doActivateDevice');