import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

function Header() {
	return (
		<div className="header">
			<nav>
				<Link className='option' to='/create'>
					Create
				</Link>
				<Link className='option' to='/delete'>
					Delete
				</Link>  
			</nav>
			<h1>
				<Link className='option' to='/'>
					Movie DB
				</Link>
			</h1>
		</div>
	)
}

export default Header