<?php
/**
 * @author Tej Parekh <tejparekh2402@gmail.com>	
 * Date : 19 Aug 2015
 * Registration controller for all the users type in the orion dashboard. 
 */
class MoviesController extends BaseController
{
	
	public function __construct()
	{

	}

	public function getAddNewMoviesForm()
	{
		return View::make('movieRegistration', array(
							'title' => 'Movies',
							'sub_title' => 'Register New Movie/Content',
							'description' => 'Fill the following form to registre new movie or released movie.' 
							)
	   					 );
	}

	/**
	 * Add New moview to the DB and validate the certificates and other values
	 * @return [Redirect] [description]
	 */
	public function doAddNewMovie()
	{
		try{


		$input = Input::all();
		$producer_id = Session::get('userid');
		$certificateFile = Input::file('censor_certificate');

		$regValidator = Validator::make($input, array(
												'production_house'             => 'required',
												'content_right_holder'         => 'required',
												'authorized_signatory'         => 'required',
												'title'                        => 'required',
												'language'                     => 'required',
												'length'                       => 'required',
												'file_format'                  => 'required',
												'censor_certificate'           => 'required|mimes:jpg,jpeg,png,bmp',
												'censor_certificate_num'       => 'required',
												'starcast'                     => 'required',
												'directors'                    => 'required',
												'inland_release_time'          => 'required',
												'overseas_release_time'        => 'required',
												'release_fdfs'                 => 'required',
												'fdfs_price'                   => 'required',
												'release_premium_library'      => 'required',
												'premium_library_price'        => 'required',
												'release_other_individual'     => 'required',
												'ppv_other_individual'         => 'required',
												'contact_authorized_signatory' => 'required',
												'contact_mobile_otp'           => 'required',
												'email_to_authorise'           => 'required'
			    							)
										);
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}
        	if ($regValidator->passes() ) {				

				if ( !empty($certificateFile) ) {
					$destinationPath = 'uploads/censor-certificates/';
					$filename  = $certificateFile->getClientOriginalName();
					$extension = $certificateFile->getClientOriginalExtension();
					$uploadCertificate = Input::file('censor_certificate')->move($destinationPath, $filename);
				}
				$inland_time = implode(' ', $input['inland_release_time']);
				$inland_time = date('Y-m-d h:i:s', strtotime($inland_time));
				$overseas_time = implode(' ', $input['overseas_release_time']);
				$overseas_time = date('Y-m-d h:i:s', strtotime($overseas_time));

				$moviesDetails = new MoviesDetails();

				$moviesDetails->production_house             = $input['production_house'           ];
				$moviesDetails->content_right_holder         = $input['content_right_holder'       ];
				$moviesDetails->authorized_signatory         = $input['authorized_signatory'       ];
				$moviesDetails->title                        = $input['title'                      ];
				$moviesDetails->language                     = $input['language'                   ];
				$moviesDetails->length                       = $input['length'                     ];
				$moviesDetails->file_format                  = $input['file_format'                ];
				$moviesDetails->censor_certificate           = $uploadCertificate;
				$moviesDetails->censor_certificate_num       = $input['censor_certificate_num'     ];
				$moviesDetails->starcast                     = $input['starcast'                   ];
				$moviesDetails->directors                    = $input['directors'                  ];
				$moviesDetails->inland_release_time          = $inland_time;
				$moviesDetails->overseas_release_time        = $overseas_time;
				$moviesDetails->release_fdfs                 = $input['release_fdfs'               ];
				$moviesDetails->fdfs_price                   = $input['fdfs_price'                 ];
				$moviesDetails->release_premium_library      = $input['release_premium_library'    ];
				$moviesDetails->premium_library_price        = $input['premium_library_price'      ];
				$moviesDetails->release_other_individual     = $input['release_other_individual'   ];
				$moviesDetails->ppv_other_individual         = $input['ppv_other_individual'       ];
				$moviesDetails->contact_authorized_signatory = $input['contact_authorized_signatory'];
				$moviesDetails->contact_mobile_otp           = $input['contact_mobile_otp'         ];
				$moviesDetails->email_to_authorise           = $input['email_to_authorise'         ];
				$moviesDetails->others_noc          		 = $input['others_noc'         ];


				$moviesDetails->save();
				if ( $moviesDetails->id && !empty($producer_id) ) {
					$movies = new Movies();
					$movies->producer_id = $producer_id;
					$movies->movies_details_id = $moviesDetails->id;
					$movies->save();
				}else{
					return Redirect::back()->with('error','Please fill form properly '.implode($reasonData) )->withInput();
				}

				if ( $movies->id ) {
					return Redirect::to('/add-movies')->with('message','Successfully registered movie/content');
				}else{
					return Redirect::back()->with('error','Please fill form properly '.implode($reasonData) )->withInput();

				}

        	}else{
        		return Redirect::back()->with('error','Please fill form properly '.implode($reasonData) )->withInput();
        	}
        }catch( Exception $e){
        	echo $responseJson = json_encode(array("status_code" => 500,"status_message"=>"Internal Server Error","data"=>array("Reason"=>$e->getMessage())));
        }
        
	}

	public function getEditMoviesForm()
	{
		$objMovies = new Movies();

		$producer_id = Session::get('userid');
		$movie_id = Session::get('movie_id');
		$singleMovieData = array();
		$moviesListDrop = array();
		if (!empty($producer_id)) {
			$moviesList = $objMovies->listProducerMovies($producer_id);
			if (!empty($movie_id)) {
				$singleMovieData = $objMovies->getSingleMovieDetails($producer_id, $movie_id);
			}

		}

		foreach ($moviesList as $key => $value) {
			$moviesListDrop[$value['movie_id']] = $value['movie_title'];
		}
		return View::make('editmoviesDetails', array(
							'title' => 'Movies',
							'sub_title' => 'Choose and Edit Movie/Content',
							'description' => 'Fill the following form to registre new movie or released movie.' ,
							'moviesList' => $moviesListDrop,
							'formData' => $singleMovieData,
							'movie_id' => $movie_id
							)
	   					 );
	}

	public function setMovieToEdit()
	{
		$input = Input::all();
		Session::forget('movie_id');
		$movie_id = $input['movie_id'];
		Session::put('movie_id', $movie_id);
		return "set";
	}

	/**
	 * Update the movie details of the Producer by the Producer.
	 * @return [Redirect] [description]
	 */
	public function doUpdateMovieDetails()
	{
		try{
		$input = Input::all();
		$producer_id = Session::get('userid');
		$certificateFile = Input::file('censor_certificate');

		$regValidator = Validator::make($input, array(
												'production_house'             => 'required',
												'content_right_holder'         => 'required',
												'authorized_signatory'         => 'required',
												'title'                        => 'required',
												'language'                     => 'required',
												'length'                       => 'required',
												'file_format'                  => 'required',
												'censor_certificate'           => 'required|mimes:jpg,jpeg,png,bmp',
												'censor_certificate_num'       => 'required',
												'starcast'                     => 'required',
												'directors'                    => 'required',
												'inland_release_time'          => 'required',
												'overseas_release_time'        => 'required',
												'release_fdfs'                 => 'required',
												'fdfs_price'                   => 'required',
												'release_premium_library'      => 'required',
												'premium_library_price'        => 'required',
												'release_other_individual'     => 'required',
												'ppv_other_individual'         => 'required',
												'contact_authorized_signatory' => 'required',
												'contact_mobile_otp'           => 'required',
												'email_to_authorise'           => 'required'
			    							)
										);
			$reasonData = $regValidator->messages();
        	$reasonData = json_decode($reasonData,true);
        	foreach($reasonData as $row){
        		$reasonData = $row;
        	}
        	if ($regValidator->passes() ) {				

				if ( !empty($certificateFile) ) {
					$destinationPath = 'uploads/censor-certificates/';
					$filename  = $certificateFile->getClientOriginalName();
					$extension = $certificateFile->getClientOriginalExtension();
					$uploadCertificate = Input::file('censor_certificate')->move($destinationPath, $filename);
				}else{
					$uploadCertificate = null;
				}
				$inland_time = implode(' ', $input['inland_release_time']);
				$inland_time = date('Y-m-d h:i:s', strtotime($inland_time));
				$overseas_time = implode(' ', $input['overseas_release_time']);
				$overseas_time = date('Y-m-d h:i:s', strtotime($overseas_time));

				$moviesDetails = MoviesDetails::find($input['movie_id']);

				$moviesDetails->production_house             = $input['production_house'           ];
				$moviesDetails->content_right_holder         = $input['content_right_holder'       ];
				$moviesDetails->authorized_signatory         = $input['authorized_signatory'       ];
				$moviesDetails->title                        = $input['title'                      ];
				$moviesDetails->language                     = $input['language'                   ];
				$moviesDetails->length                       = $input['length'                     ];
				$moviesDetails->file_format                  = $input['file_format'                ];
				$moviesDetails->censor_certificate           = $uploadCertificate;
				$moviesDetails->censor_certificate_num       = $input['censor_certificate_num'     ];
				$moviesDetails->starcast                     = $input['starcast'                   ];
				$moviesDetails->directors                    = $input['directors'                  ];
				$moviesDetails->inland_release_time          = $inland_time;
				$moviesDetails->overseas_release_time        = $overseas_time;
				$moviesDetails->release_fdfs                 = $input['release_fdfs'               ];
				$moviesDetails->fdfs_price                   = $input['fdfs_price'                 ];
				$moviesDetails->release_premium_library      = $input['release_premium_library'    ];
				$moviesDetails->premium_library_price        = $input['premium_library_price'      ];
				$moviesDetails->release_other_individual     = $input['release_other_individual'   ];
				$moviesDetails->ppv_other_individual         = $input['ppv_other_individual'       ];
				$moviesDetails->contact_authorized_signatory = $input['contact_authorized_signatory'];
				$moviesDetails->contact_mobile_otp           = $input['contact_mobile_otp'         ];
				$moviesDetails->email_to_authorise           = $input['email_to_authorise'         ];
				$moviesDetails->others_noc          		 = $input['others_noc'         ];


				$moviesDetails->save();

					return Redirect::to('/view-movies')->with('message','Successfully updated movie/content');

        	}else{
        		return Redirect::back()->with('error','Please fill form properly '.implode($reasonData) )->withInput();
        	}
        }catch( Exception $e){
        	echo $responseJson = json_encode(array("status_code" => 500,"status_message"=>"Internal Server Error","data"=>array("Reason"=>$e->getMessage())));
        }
        
	}
	/**
	 * Get the list of all the movies from all the Producers
	 * @return [type] [description]
	 */
	public function getAllMoviesList()
	{
		return View::make('listAllMovies', array(
							'title' => 'Movies',
							'sub_title' => 'Manage Movies',
							'description' => 'View movies.' 
							)
	   					 );
	}

	public function getSingleMoviesToView()
	{
		$input = Input::all();
		$objMovies = new Movies();

		$movie_id = $input['id'];
		Session::put('movie_id',$movie_id);

		$singleMovieData = array();
		$moviesListDrop = array();
		if (!empty($movie_id)) {
			$moviesList = $objMovies->listAllMovies();
			$singleMovieData = $objMovies->getSingleMovieDataToView($movie_id);

		}

		foreach ($moviesList as $key => $value) {
			$moviesListDrop[$value['movie_id']] = $value['movie_title'];
		}
		return View::make('viewMoviesDetailsAll', array(
							'title' => 'Movies',
							'sub_title' => 'View Movie/Content',
							'description' => 'Fill the following form to registre new movie or released movie.' ,
							'moviesList' => $moviesListDrop,
							'formData' => $singleMovieData,
							'movie_id' => $movie_id
							)
	   					 );
	}
}