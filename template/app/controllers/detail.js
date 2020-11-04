const rp = require('request-promise-native');

const server = `http://localhost:${process.env.PORT}`;

module.exports.detail = async (req, res) => {
	try {
		let movie = JSON.parse(await rp.get(`${server}/api/movies/${req.params.movieid}`));
		console.log(`movie: ${movie}`)
		res.render(
			'detail', 
			{
				title: 'Movie DB',
				movie: movie
			},
		);
	} catch (err) {
		res.render(
			'error',
			{
				message: "Server Error",
				detail: "Probably a bad movieid",
				error: err
			}
		);
	}
}