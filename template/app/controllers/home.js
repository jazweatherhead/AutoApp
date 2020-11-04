const rp = require('request-promise-native');

const server = `http://localhost:${process.env.PORT}`;

module.exports.home = async (req, res) => {
	let movies = JSON.parse(await rp.get(`${server}/api/movies`));

	res.render(
		'index', 
		{
			title: 'Movie DB',
			movies: movies
		},
	);
}
