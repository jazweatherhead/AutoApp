import React, { useState } from 'react'
import axios from 'axios'

import useInput from '../../hooks/useInput'
import './CreateMovie.scss'

function CreateMovie() {
	const [title, setTitle] = useInput(null)
	const [director, setDirector] = useInput(null)
	const [year, setYear] = useInput(null)
	const [msg, setMsg] = useState('')
	const [msgColor, setMsgColor] = useState('#0f0')
	
	function handleSubmit(e) {
		e.preventDefault()
		// add to db
		postMovie(
			title,
			director,
			year
		)
		// clear form
		document.getElementById('create-movie-form').reset()
	}
	
	// TODO test this
	function postMovie(title, director, year) {
		axios.post('api/movies', {
			title: title,
			director: director,
			year: year
		})
		.then(res => {
			if (res.data) {
				console.log(res.data)
				console.log('movie added to db')
				// show message
				setMsg('Movie added to database!')
				setMsgColor('#0ff')
			}
		})
		.catch(err => {
			console.error(err)
			// show message
			setMsg('Problem adding movie to database!')
			setMsgColor('#f00')
		})
	}
	
	return (
		<div className="create-movie">
		<h2>Create Movie</h2>
		<p id="msg" style={{fontWeight: 'bold', color: msgColor}}>{msg}</p>
		<form onSubmit={handleSubmit} id="create-movie-form">
			<label htmlFor="title">Title:</label><br />
			<input type="text" name="title" onChange={setTitle} required />
			<br />
			<label htmlFor="director">Director:</label><br />
			<input type="text" name="director" onChange={setDirector} required />
			<br />
			<label htmlFor="year">Year:</label><br />
			<input type="text" name="year" onChange={setYear} required />
			<br />
			<input type="submit" value="Add Movie to DB"/>
		</form>
		</div>
	)
}

export default CreateMovie