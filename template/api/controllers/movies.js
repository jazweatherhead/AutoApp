const mongoose = require('mongoose');
mongoose.set('returnOriginal', false);
const Movie = mongoose.model('Movie');

const sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET /api/movies/ */
module.exports.moviesList = async (req, res) => {
	try {
		const movies = await Movie.find({}); // find all documents
		console.log(movies);
		sendJSONresponse(res, 200, movies);
	} catch (err) {
		console.log(err.message);
		sendJSONresponse(res, 400, err);
	}
};

/* POST /api/movies/ (Create) */
module.exports.moviesCreate = async (req, res) => {	
	const movie = new Movie(req.body);
	try {
		await movie.save();
		sendJSONresponse(res, 201, movie);
	} catch (err) {
		console.log(err.message)
		sendJSONresponse(res, 500, err);
	}
};

/* GET /api/movies/:movieid (Read) */
module.exports.moviesReadOne = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.movieid);
		if (!movie) {
			sendJSONresponse(res, 404);
			return;
		}
		console.log(movie);
		sendJSONresponse(res, 200, movie);
	} catch (err) {
		console.log(err.message);
		sendJSONresponse(res, 500, err);
	}
};

/* PUT /api/movies/:movieid (Update) */
module.exports.moviesUpdateOne = async(req, res) => {
	const movieid = req.params.movieid;
	console.log('movieid: ', movieid)
	try {
		await Movie.findByIdAndUpdate(movieid, req.body);
		sendJSONresponse(res, 200, req.query);
	} catch (err) {
		console.log(err.message);
		sendJSONresponse(res, 500, err);
	}
}

/* DELETE /api/movies/:movieid (Delete) */
module.exports.moviesDeleteOne = async (req, res) => {
  try {
		const movieid = req.params.movieid;
    const movie = await Movie.findByIdAndDelete(movieid);
    if (!movie) {
			sendJSONresponse(res, 404);
			return;
		}
		console.log("movie id " + movieid + " deleted");
    sendJSONresponse(res, 204, null);
  } catch (err) {
		console.log(err.message);
		sendJSONresponse(res, 500, err);
  }
};