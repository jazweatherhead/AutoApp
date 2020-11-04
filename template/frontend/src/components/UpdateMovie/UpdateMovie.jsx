import React, { useState } from 'react'
import axios from 'axios'

const UpdateMovie = (props) => {
	const [msg, setMsg] = useState('')
	const [msgColor, setMsgColor] = useState('#0f0')
	const { handleInputChange, movie, movieid}
	
	function updateMovie(movieid) {
		axios.put(`api/movies/${movieid}`,
			{
				title: movie.title,
				director: movie.director,
				year: movie.year
			}
		)
		.then(res => {
			console.log('movie updated')
			// show message
			setMsg('Movie updated!')
			setMsgColor('#0ff')
		})
		.catch(err => {
			console.error(err)
			// show message
			setMsg('Problem updating movie!')
			setMsgColor('#f00')
		})
	}
	
	function handleSubmit(e) {
		e.preventDefault()
		// update movie
		updateMovie(movieid)
		// clear form
		document.getElementById('update-movie-form').reset()
	}
	
	return(
		<div>
			<div className="update-movie"><br />
				<h3>Update Movie</h3>
				<p id="msg" style={{fontWeight: 'bold', color: msgColor}}>{msg}</p>
				<form onSubmit={handleSubmit} id="update-movie-form">
					<label htmlFor="title">Title:</label><br />
					<input type="text" name="title" id="title" value={movie.title} onChange={handleInputChange} /><br />
					<label htmlFor="director">Director:</label><br />
					<input type="text" name="director" id="director" value={movie.director} onChange={handleInputChange} /><br />
					<label htmlFor="year">Year:</label><br />
					<input type="text" name="year" id="year" value={movie.year} onChange={handleInputChange} /><br />
					<input type="submit" value="Update Movie"/>
				</form>
			</div>
		</div>
	)
}

export default UpdateMovie