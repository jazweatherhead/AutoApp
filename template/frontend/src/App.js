import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'

import Header from './components/Header/Header'
import CreateMovie from './components/CreateMovie/CreateMovie'
import ReadMovies from './components/ReadMovies/ReadMovies'
import ReadMovie from './components/ReadMovie/ReadMovie'
import DeleteMovie from './components/DeleteMovie/DeleteMovie'

import 'normalize.css'
import './App.css'

function App() {
		return (
			<Router>
				<div className="App">
					<Header />
					<main>
						<Switch>
							<Route exact path='/' component={ReadMovies} />
							<Route path='/create' component={CreateMovie} />
							<Route path='/delete' component={DeleteMovie} />
							<Route path='/:movieid' component={ReadMovie} />
						</Switch>
					</main>
				</div>
			</Router>
		)
}

export default App
