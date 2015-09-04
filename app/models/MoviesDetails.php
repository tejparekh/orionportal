<?php
/**
    * @ author Arun
	* @ date 3/17/2014
	* User Role model
*/
class MoviesDetails extends Eloquent  {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'movies_details';

	/**
	 * The attributes excluded from the model's JSON form.
	 * @var array
	 */
	protected $hidden = array('');

	/**
	 * ret
	 * @var array
	 */
	public function getMoviesDetails($id)
	{
		if(empty($id))
		{
			throw new Exception('invalid parameter passed');
		}
		$arrMoviesDetails	= MoviesDetails::where('id', '=', $id)->firstOrFail()->toArray();
		return $arrMoviesDetails;
	}



}