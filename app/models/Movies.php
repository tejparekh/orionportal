<?php
/**
    * @ author Arun
	* @ date 3/17/2014
	* User Role model
*/
class Movies extends Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'movies';

	/**
	 * The attributes excluded from the model's JSON form.
	 * @var array
	 */
	protected $hidden = array('');

	/**
	 * ret
	 * @var array
	 */

	public function listProducerMovies($user_id)
	{
		return Movies::select('movies_details.id as movie_id','movies_details.title as movie_title')
									->where('movies.producer_id',$user_id)
									->join('movies_details','movies.movies_details_id','=','movies_details.id')
									->get()->toArray();
	}

	public function getSingleMovieDetails($user_id, $movie_id)
	{
		return Movies::where('movies.producer_id',$user_id)
									->where('movies.movies_details_id',$movie_id)
									->join('movies_details','movies.movies_details_id','=','movies_details.id')
									->first()->toArray();
	}
	public function MoviesGridListData($sortOrder, $offsetValue, $recordsPerPage, $sortColName )
	{
		return Movies::select(DB::raw('CONCAT(users.first_name, " ", users.last_name) AS producer_name') ,'movies_details.title','movies_details.inland_release_time', 'movies_details.production_house','movies_details.language','movies_details.length','movies_details.starcast','movies.movies_details_id as movie_id')
									->join('movies_details','movies.movies_details_id','=','movies_details.id')
									->leftjoin('users','movies.producer_id','=','users.id')
									->where('movies_details.deleted_at' ,'=','0000-00-00 00:00:00')
									->orderBy($sortColName, $sortOrder)
									->skip($offsetValue)
									->take($recordsPerPage)->get()->toArray();
	}
	public function MoviesGridListDataCount( )
	{
		return Movies::select(DB::raw('CONCAT(users.first_name, " ", users.last_name) AS producer_name') ,'movies_details.title','movies_details.inland_release_time', 'movies_details.production_house','movies_details.language','movies_details.length','movies_details.starcast')
									->join('movies_details','movies.movies_details_id','=','movies_details.id')
									->leftjoin('users','movies.producer_id','=','users.id')
									->where('movies_details.deleted_at' ,'=','0000-00-00 00:00:00')
									->count();
	}

	/*FOR ALL admins to view movie data*/
	public function listAllMovies()
	{
		return Movies::select('movies_details.id as movie_id','movies_details.title as movie_title')
									->join('movies_details','movies.movies_details_id','=','movies_details.id')
									->get()->toArray();
	}
	/*FOR ALL admins to view movie data*/
	public function getSingleMovieDataToView($movie_id)
	{
		return Movies::where('movies.movies_details_id',$movie_id)
									->join('movies_details','movies.movies_details_id','=','movies_details.id')
									->first()->toArray();
	}


}