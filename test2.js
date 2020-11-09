const config = {
	name: 'Movie-DB', // No-Spaces
	yarn: true,
	dbNounSingular: 'film', // thing you're storing in db
	dbNounPlural: 'films',
	dbSchema: { // db fields, field types and if they're required
		title: {
			type: 'String',
			required: true
		},
		director: {
			type: 'String',
			required: true
		},
		year: {
			type: 'Number',
			required: true
		}
	},
	title: 'title' // see README
}

const lowerCaseSingular = 'film'
const movieid = 123456789

function buildReadNoun() {
	makeRead = () => {
		// let model1 = ''
		// for (const key in config.dbSchema) {
		// 	model1 += `\t\t\t\t\t${key}: '',\n`
		// }
		
		let model2 = ''
		
		let target = 0
		const keys = Object.keys(config.dbSchema)
		for (const key in config.dbSchema) {
			// console.log(`\t\t\t\t\tcase '${key}':\n\t\t\t\t\t\teditBlock = {`)
			model2 += `\t\t\t\t\tcase '${key}':\n\t\t\t\t\t\teditBlock = {`
			for (let key2 = 0; key2 < keys.length; key2++) {
				const isTarget = key2 === target ? true : false
				const value = isTarget ? 'e.target.value' : `${lowerCaseSingular}.${keys[key2]}`
				// console.log(`\t\t\t\t\t\t\t${keys[key2]}: ${value},`)
				model2 += `\t\t\t\t\t\t\t${keys[key2]}: ${value},`
			}
			// console.log(`\t\t\t\t\t\t}\n\t\t\t\t\t\tbreak`)
			model2 += `\t\t\t\t\t\t}\n\t\t\t\t\t\tbreak`
			target++
		}
		
		console.log(model2)
		
		// let model3 = ''
		
		// model3 = `\t\t\t\t\t\t<h2>{${lowerCaseSingular}.${config.title}}</h2>\n`
		// for (const key in config.dbSchema) {
		// 	if (key !== config.title) {
		// 		model3 += `\t\t\t\t\t\t${key[0].toUpperCase() + key.slice(1)}: {${lowerCaseSingular}.${key}}<br />\n`
		// 	}
		// }
		
// 		const read = `import React, { useState, useEffect } from 'react'
// 		import axios from 'axios'
// 		import { useParams } from 'react-router-dom'
		
// 		import UpdateMovie from '../UpdateMovie/UpdateMovie'
		
// 		import './ReadMovie.scss'
		
// 		function ReadMovie() {
// 			const [movie, setMovie] = useState(
// 				{
// ${model1}
// 				}
// 			)
// 			const [isUpdateHidden, setIsUpdateHidden] = useState(true)	
			
// 			let { movieid } = useParams()
			
// 			// get movie details
// 			useEffect(() => {
// 				axios.get(\`/api/movies/${movieid}\`)
// 					.then(res => {
// 						setMovie(res.data)
// 						console.log(res.data)
// 					})
// 					.catch(err => console.error(err))
// 			}, [])
			
// 			function handleEditButton(e) {
// 				e.preventDefault()
// 				setIsUpdateHidden(!isUpdateHidden)
// 			}
		
// 			function handleInputChange(e) {
// 				let editBlock
// 				switch (e.target.name) {
// ${model2}
// 					default:
// 						console.log('The form is confused...')
// 						break
// 				}
		
// 				setMovie(editBlock)
// 			}
			
// 			return (
// 				<div>
// 					<div className="read-movie">
// ${model3}
// 						<br />
// 						<form>
// 							<input type="submit" value={isUpdateHidden ? "Edit Movie": "Nevermind"} onClick={handleEditButton}/>
// 						</form>
// 					</div>
// 					{!isUpdateHidden && (
// 						<UpdateMovie
// 							movie={movie}
// 							movieid={movieid}
// 							handleInputChange={handleInputChange} /> 
// 					)}
// 				</div>
// 			)
// 		}
		
// 		export default ReadMovie
// 	`
// 		console.log(`\n${read}`)
// 		return read
	}
	makeRead()
}
buildReadNoun()