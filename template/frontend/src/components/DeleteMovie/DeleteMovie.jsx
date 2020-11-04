import React, { useState, useEffect } from 'react'
import axios from 'axios'

import useSelect from '../../hooks/useSelect'
	
import './DeleteMovie.scss'

function DeleteMovie() {
	const [id, setId] = useSelect(null)
	const [movies, setMovies] = useState([])
	const [msg, setMsg] = useState('')
	const [msgColor, setMsgColor] = useState('#0f0')
	
	useEffect(() => {
		getMovies()
	}, [])
	
	function getMovies() {
		axios.get('/api/movies')
			.then(res => {
				if (res.data) {
					setMovies(res.data)
					console.log(res.data)
				}
			})
			.catch(err => console.error(err))
	}
	
	function handleSubmit(e) {
		e.preventDefault()
		// remove from db
		delMovie(id)
		// get movie list again
		getMovies()
	}
	
	function delMovie(id) {
		axios.delete(`api/movies/${id}`)
		.then(res => {
				console.log('movie removed from db')
				// show message
				setMsg('Movie removed from database!')
				setMsgColor('#0ff')
		})
		.catch(err => {
			console.error(err)
			// show message
			setMsg('Problem removing Movie from database!')
			setMsgColor('#f00')
		})
	}
	
	return (
		<div className="delete-movie">
		<h2>Delete Movie</h2>
		<p id="msg" style={{fontWeight: 'bold', color: msgColor}}>{msg}</p>
		<form onSubmit={handleSubmit} id="delete-movie-form">
			<label htmlFor="title">Title:</label><br /><br />
			<select id="movie" name="movie" onChange={setId}>
			{
				movies.map(movie => (
					<option key={movie._id} value={movie._id}>{movie.title}</option>
				))
			}
			</select>
			<br />
			<input type="submit" value="Remove Movie from DB"/>
		</form>
		</div>
	)
}

export default DeleteMovie