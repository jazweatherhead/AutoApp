import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './ReadMovies.scss'

function ReadMovies() {
	const [movies, setMovies] = useState([])
	
	useEffect(() => {
		getMovies()
	}, [])
	
	function getMovies () {
		axios.get('/api/movies')
			.then(res => {
				if (res.data) {
					setMovies(res.data)
					console.log(res.data)
				}
			})
			.catch(err => console.error(err))
	}
	
	return (
		<div className="read-movies">
			{
				movies.map(movie => (
				<p key={movie._id}>
					<a href={`/${movie._id}`}>{movie.title}</a>
				</p>
				))
			}
		</div>
	)
}

export default ReadMovies