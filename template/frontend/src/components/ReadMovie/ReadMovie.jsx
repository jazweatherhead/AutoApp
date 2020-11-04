import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import UpdateMovie from '../UpdateMovie/UpdateMovie'

import './ReadMovie.scss'

function ReadMovie() {
	const [movie, setMovie] = useState(
		{
			title: '',
			director: '',
			year: ''
		}
	)
	const [isUpdateHidden, setIsUpdateHidden] = useState(true)	
	
	let { movieid } = useParams()
	
	// get movie details
	useEffect(() => {
		axios.get(`/api/movies/${movieid}`)
			.then(res => {
				setMovie(res.data)
				console.log(res.data)
			})
			.catch(err => console.error(err))
	}, [])
	
	function handleEditButton(e) {
		e.preventDefault()
		setIsUpdateHidden(!isUpdateHidden)
	}

  function handleInputChange(e) {
    let editBlock
    switch (e.target.name) {
      case 'title':
        editBlock = {
					title: e.target.value,
					director: movie.director,
					year: movie.year
        }
        break
      case 'director':
        editBlock = {
					title: movie.title,
					director: e.target.value,
					year: movie.year
        }
        break
      case 'year':
        editBlock = {
					title: movie.title,
					director: movie.director,
					year: e.target.value
        }
        break

      default:
        console.log('The form is confused...')
        break
    }

    setMovie(editBlock)
  }
	
	return (
		<div>
			<div className="read-movie">
				<h2>{movie.title}</h2>
				Director: {movie.director}<br />
				Year: {movie.year}<br /><br />
				<form>
					<input type="submit" value={isUpdateHidden ? "Edit Movie": "Nevermind"} onClick={handleEditButton}/>
				</form>
			</div>
			{ !isUpdateHidden && <UpdateMovie 
															movie={movie}
															movieid={movieid}
															handleInputChange={handleInputChange} /> }
		</div>
	)
}

export default ReadMovie