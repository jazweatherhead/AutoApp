const fs = require('fs-extra')

/* Edit the config object with your project details */
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

const asset_dir = __dirname + '/assets/'
const packMan = config.yarn ? 'yarn' : 'npm'
let lowerCaseSingular, titleCaseSingular, lowerCasePlural, upperCasePlural, titleCasePlural

;(function makeNouns() {
	lowerCaseSingular = config.dbNounSingular.toLowerCase()
	titleCaseSingular = config.dbNounSingular[0].toUpperCase() + config.dbNounSingular.slice(1)
	lowerCasePlural = config.dbNounPlural.toLowerCase()
	upperCasePlural = config.dbNounPlural.toUpperCase()
	titleCasePlural = config.dbNounPlural[0].toUpperCase() + config.dbNounPlural.slice(1)
})()

/* Setup spinner */
const Spinner = require('cli-spinner').Spinner
const spinner = new Spinner('processing.. %s')
spinner.setSpinnerString('|/-\\')
spinner.start()

// /* For the copyright notice */
// const now = new Date()
// const year = now.getFullYear()

/* Build model */
let finalModel
function buildModel() {
	makeModel = () => {
		let schema = ''
		for (const key in config.dbSchema) {
			schema += `	${key}: { type: ${config.dbSchema[key].type}, required: ${config.dbSchema[key].required}},\n`
		}
	
		const model = `const mongoose = require('mongoose')
	
		const ${lowerCaseSingular}Schema = new mongoose.Schema({
	${schema}
	})
	mongoose.model('${titleCaseSingular}', ${lowerCaseSingular}Schema) // the first param determines the collection name
	`
	// console.log(`\n${model}`)
		return model
	}
	makeModel()
	
	packModel = async () => {
		try {
			const model = makeModel()
	
			const reNewLine = /\n/g
			const reTab = /\t/g
			const reQuote = /'/g
			
			const packedModel = model
			.replace(reNewLine, '\n')
			.replace(reTab, '\t')
			.replace(reQuote, "\'")
			
			// console.log(packedModel)
			
			const objModel = {
				file: `api/models/${lowerCasePlural}.js`,
				content: packedModel
			}
			
			finalModel = objModel
			
		} catch (err) {
			console.error('! Problem Packing Model !')
			throw err
		}
	}
	packModel()
}
buildModel()

let finalRead
function buildReadNoun() {
	makeRead = () => {
		let model1 = ''
		for (const key in config.dbSchema) {
			model1 += `\t\t\t${key}: '',\n`
		}
		
		let model2 = ''
		
		let target = 0
		const keys = Object.keys(config.dbSchema)
		for (const key in config.dbSchema) {
			model2 += `\t\t\tcase '${key}':\n\t\t\t\teditBlock = {\n`
			for (let key2 = 0; key2 < keys.length; key2++) {
				const isTarget = key2 === target ? true : false
				const value = isTarget ? 'e.target.value' : `${lowerCaseSingular}.${keys[key2]}`
				model2 += `\t\t\t\t\t${keys[key2]}: ${value},\n`
			}
			model2 += `\t\t\t\t}\n\t\t\t\tbreak\n`
			target++
		}
		
		let model3 = ''
		
		model3 = `\t\t\t\t<h2>{${lowerCaseSingular}.${config.title}}</h2>\n`
		for (const key in config.dbSchema) {
			if (key !== config.title) {
				model3 += `\t\t\t\t${key[0].toUpperCase() + key.slice(1)}: {${lowerCaseSingular}.${key}}<br />\n`
			}
		}
		
		const read = `import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Update${titleCaseSingular} from '../Update${titleCaseSingular}/Update${titleCaseSingular}'

import './Read${titleCaseSingular}.scss'

function Read${titleCaseSingular}() {
	const [${lowerCaseSingular}, set${titleCaseSingular}] = useState(
		{
${model1}
		}
	)
	const [isUpdateHidden, setIsUpdateHidden] = useState(true)	
	
	let { ${lowerCaseSingular}id } = useParams()
	
	// get movie details
	useEffect(() => {
		axios.get(\`/api/${lowerCasePlural}/$\{${lowerCaseSingular}id\}\`)
			.then(res => {
				set${titleCaseSingular}(res.data)
				console.log(res.data)
			})
			.catch(err => console.error(err))
	}, [${lowerCaseSingular}id])
	
	function handleEditButton(e) {
		e.preventDefault()
		setIsUpdateHidden(!isUpdateHidden)
	}

	function handleInputChange(e) {
		let editBlock
		switch (e.target.name) {
${model2}
			default:
				console.log('The form is confused...')
				break
		}

		set${titleCaseSingular}(editBlock)
	}
	
	return (
		<div>
			<div className="read-${lowerCaseSingular}">
${model3}
				<br />
				<form>
					<input type="submit" value={isUpdateHidden ? "Edit ${titleCaseSingular}": "Nevermind"} onClick={handleEditButton}/>
				</form>
			</div>
			{!isUpdateHidden && (
				<Update${titleCaseSingular}
					${lowerCaseSingular}={${lowerCaseSingular}}
					${lowerCaseSingular}id={${lowerCaseSingular}id}
					handleInputChange={handleInputChange} /> 
			)}
		</div>
	)
}

export default Read${titleCaseSingular}
	`
		// console.log(`\n${read}`)
		return read
	}
	makeRead()
	
	packRead = async () => {
		try {
			const read = makeRead()
	
			const reNewLine = /\n/g
			const reTab = /\t/g
			const reQuote = /'/g
			
			const packedRead = read
			.replace(reNewLine, '\n')
			.replace(reTab, '\t')
			.replace(reQuote, "\'")
			
			// console.log(packedRead)
			
			const objRead = {
				file: 'frontend/src/components/Read' + titleCaseSingular + '/Read' + titleCaseSingular + '.jsx',
				content: packedRead
			}
			
			finalRead = objRead
			// console.log(finalRead)
			
		} catch (err) {
			console.error('! Problem Packing ReadNoun !')
			throw err
		}
	}
	packRead()
}
buildReadNoun()

let finalUpdate
function buildUpdateNoun() {
	makeUpdate = () => {
		let model1 = ''
		for (const key in config.dbSchema) {
			model1 += `\t\t\t\t${key}: ${lowerCaseSingular}.${key},\n`
		}
		
		let model2 = ''
		for (const key in config.dbSchema) {
			model2 += `\t\t\t\t\t<label htmlFor="${key}">${key[0].toUpperCase() + key.slice(1)}:</label><br />\n`
			model2 += `\t\t\t\t\t<input type="text" name="${key}" id="${key}" value={${lowerCaseSingular}.${key}} onChange={handleInputChange} /><br />\n`
		}
		
	
		const update = `import React, { useState } from 'react'
import axios from 'axios'

const Update${titleCaseSingular} = (props) => {
	const [msg, setMsg] = useState('')
	const [msgColor, setMsgColor] = useState('#0f0')
	const { handleInputChange, ${lowerCaseSingular}, ${lowerCaseSingular}id}
	
	function update${titleCaseSingular}(${lowerCaseSingular}id) {
		axios.put(\`api/movies/${movieid}\`,
			{
${model1}
			}
		)
		.then(res => {
			console.log('${lowerCaseSingular} updated')
			// show message
			setMsg('Movie updated!')
			setMsgColor('#0ff')
		})
		.catch(err => {
			console.error(err)
			// show message
			setMsg('Problem updating ${lowerCaseSingular}!')
			setMsgColor('#f00')
		})
	}
	
	function handleSubmit(e) {
		e.preventDefault()
		// update ${lowerCaseSingular}
		update${titleCaseSingular}(${lowerCaseSingular}id)
		// clear form
		document.getElementById('update-${lowerCaseSingular}-form').reset()
	}
	
	return(
		<div>
			<div className="update-${lowerCaseSingular}"><br />
				<h3>Update ${titleCaseSingular}</h3>
				<p id="msg" style={{fontWeight: 'bold', color: msgColor}}>{msg}</p>
				<form onSubmit={handleSubmit} id="update-${lowerCaseSingular}-form">
${model2}
					<input type="submit" value="Update ${titleCaseSingular}"/>
				</form>
			</div>
		</div>
	)
}

export default Update${titleCaseSingular}`
		// console.log(`\n${update}`)
		return update
	}
	makeUpdate()
	
	packUpdate = async () => {
		try {
			const read = makeUpdate()
	
			const reNewLine = /\n/g
			const reTab = /\t/g
			const reQuote = /'/g
			
			const packedUpdate = read
			.replace(reNewLine, '\n')
			.replace(reTab, '\t')
			.replace(reQuote, "\'")
			
			// console.log(packedUpdate)
			
			const objUpdate = {
				file: 'frontend/src/components/Update' + titleCaseSingular + '/Update' + titleCaseSingular + '.jsx',
				content: packedUpdate
			}
			
			finalUpdate = objUpdate
			// console.log(finalUpdate)
			
		} catch (err) {
			console.error('! Problem Packing UpdateNoun !')
			throw err
		}
	}
	packUpdate()
}
buildUpdateNoun()

// function buildCreateNoun() {
	
// }

/* Directories to be built. */
const dirs = [
	'api',
	'app',
	'bin',
	'frontend',
	'public',
	'public/images',
	'public/javascripts',
	'public/stylesheets',
	'frontend/public',
	'frontend/src',
	'frontend/src/components',
	'frontend/src/hooks',
	'frontend/src/components/Create' + titleCaseSingular,
	'frontend/src/components/Delete' + titleCaseSingular,
	'frontend/src/components/Header',
	'frontend/src/components/Read' + titleCaseSingular,
	'frontend/src/components/Read' + titleCasePlural,
	'frontend/src/components/Update' + titleCaseSingular,
	'app/controllers',
	'app/routes',
	'app/views',
	'api/controllers',
	'api/models',
	'api/routes',
]

/* Files to be built */
files = [
{ file: '.env',
  content: "#Change MONGODB_URI to your production db\nMONGODB_URI = mongodb://localhost/" + upperCasePlural +"_DB\nPORT = 9000"},
{ file: 'app.js',
  content: "const express = require(\'express\');\nconst path = require(\'path\');\nconst createError = require(\'http-errors\');\nconst cookieParser = require(\'cookie-parser\');\nconst logger = require(\'morgan\');\nconst sassMiddleware = require(\'node-sass-middleware\');\nconst favicon = require(\'serve-favicon\');\nrequire(\'dotenv\').config();\nrequire(\'./api/models/db\');\n\nconst routes = require(\'./app/routes/index\');\nconst routesApi = require(\'./api/routes/index\');\n\nconst app = express();\n\n// view engine setup\napp.set(\'views\', path.join(__dirname, \'app\', \'views\'));\napp.set(\'view engine\', \'pug\');\n\napp.use(favicon(__dirname + \'/public/favicon.ico\'));\napp.use(logger(\'dev\'));\napp.use(express.json());\napp.use(express.urlencoded({ extended: false }));\napp.use(cookieParser());\napp.use(sassMiddleware({\n  src: path.join(__dirname, \'public\'),\n  dest: path.join(__dirname, \'public\'),\n  indentedSyntax: false, // true = .sass and false = .scss\n  sourceMap: true\n}));\napp.use(express.static(path.join(__dirname, \'public\')));\n\napp.use(\'/\', routes);\napp.use(\'/api\', routesApi);\n\n// catch 404 and forward to error handler\napp.use(function(req, res, next) {\n  next(createError(404));\n});\n\n// error handler\napp.use(function(err, req, res, next) {\n  // set locals, only providing error in development\n  res.locals.message = err.message;\n  res.locals.error = req.app.get(\'env\') === \'development\' ? err : {};\n\n  // render the error page\n  res.status(err.status || 500);\n  res.render(\'error\');\n});\n\nmodule.exports = app;\n"},
{ file: 'package.json',
  content: "{\n  \"name\": \"" + config.name + "\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"main\": \"./bin/www\",\n\"scripts\": {\n    \"start\": \"set NODE_ENV=production; nodemon ./bin/www\",\n    \"dev\": \"set NODE_ENV=development; concurrently \\\"nodemon ./bin/www\\\" \\\"cd frontend && yarn start\\\"\",\n    \"debug\": \"set NODE_ENV=development; concurrently \\\"DEBUG=" + config.name + ":* nodemon ./bin/www\\\" \\\"cd frontend && yarn start\\\"\"\n  },\n\"dependencies\": {\n    \"concurrently\": \"^5.3.0\",\n    \"cookie-parser\": \"^1.4.5\",\n    \"debug\": \"~2.6.9\",\n    \"dotenv\": \"^8.2.0\",\n    \"express\": \"~4.16.1\",\n    \"http-errors\": \"~1.6.3\",\n    \"mongodb\": \"^3.6.2\",\n    \"mongoose\": \"^5.10.9\",\n    \"morgan\": \"~1.9.1\",\n    \"node-sass-middleware\": \"0.11.0\", \n    \"nodemon\": \"^2.0.5\",\n    \"pug\": \"2.0.0-beta11\",\n    \"request\": \"^2.88.2\",\n    \"request-promise-native\": \"^1.0.9\",\n    \"serve-favicon\": \"^2.5.0\"\n  }\n}\n"},
{ file: 'public/stylesheets/style.css',
  content: "body {\n  padding: 50px;\n  font: 16px \"Lucida Grande\", Helvetica, Arial, sans-serif; \n  background-color: black;\n  color: #0F0;}\n\na {\n\tcolor: #F0F;\n\ttext-decoration: none; }\n\n/*# sourceMappingURL=style.css.map */"},
{ file: 'public/stylesheets/style.css.map',
  content: "{\n\t\"version\": 3,\n\t\"file\": \"style.css\",\n\t\"sources\": [\n\t\t\"style.sass\"\n\t],\n\t\"names\": [],\n\t\"mappings\": \"AAAA,AAAA,IAAI,CAAC;EACH,OAAO,EAAE,IAAI;EACb,IAAI,EAAE,kDAAkD,GAAG;;AAE7D,AAAA,CAAC,CAAC;EACA,KAAK,EAAE,OAAO,GAAG\"\n}"},
{ file: 'public/stylesheets/style.sass',
  content: "body\n  padding: 50px\n  font: 14px \"Lucida Grande\", Helvetica, Arial, sans-serif\n\na\n  color: #00B7FF\n"},
{ file: 'frontend/package.json',
  content: "{\n  \"name\": \"frontend\",\n  \"version\": \"0.1.0\",\n  \"private\": true,\n  \"proxy\": \"http://localhost:9000\",\n  \"dependencies\": {\n    \"@testing-library/jest-dom\": \"^4.2.4\",\n    \"@testing-library/react\": \"^9.3.2\",\n    \"@testing-library/user-event\": \"^7.1.2\",\n    \"axios\": \"^0.20.0\",\n    \"normalize.css\": \"^8.0.1\",\n    \"react\": \"^16.14.0\",\n    \"react-dom\": \"^16.14.0\",\n    \"react-router-dom\": \"^5.2.0\",\n    \"react-scripts\": \"3.4.3\"\n  },\n  \"scripts\": {\n    \"start\": \"react-scripts start\",\n    \"build\": \"react-scripts build\",\n    \"test\": \"react-scripts test\",\n    \"eject\": \"react-scripts eject\"\n  },\n  \"eslintConfig\": {\n    \"extends\": \"react-app\"\n  },\n  \"browserslist\": {\n    \"production\": [\n      \">0.2%\",\n      \"not dead\",\n      \"not op_mini all\"\n    ],\n    \"development\": [\n      \"last 1 chrome version\",\n      \"last 1 firefox version\",\n      \"last 1 safari version\"\n    ]\n  }\n}\n"},
{ file: 'frontend/src/App.css',
  content: "body {\n  padding: 50px;\n  font: 16px \"Lucida Grande\", Helvetica, Arial, sans-serif; \n  background-color: black;\n  color: #0F0;}\n\na {\n\tcolor: #F0F;\n\ttext-decoration: none;}\n\t\nlabel {\n\tfont-weight: bold;}\n\ninput {\n\tmargin-top: 10px;\n\tmargin-bottom: 10px;}"},
{ file: 'frontend/src/App.js',
  content: "import React from \'react\'\nimport {\n\tBrowserRouter as Router,\n\tSwitch,\n\tRoute\n} from \'react-router-dom\'\n\nimport Header from \'./components/Header/Header\'\nimport Create" + titleCaseSingular + " from \'./components/Create" + titleCaseSingular + "/Create" + titleCaseSingular + "\'\nimport Read" + titleCasePlural + " from \'./components/Read" + titleCasePlural + "/Read" + titleCasePlural + "\'\nimport Read" + titleCaseSingular + " from \'./components/Read" + titleCaseSingular + "/Read" + titleCaseSingular + "\'\nimport Delete" + titleCaseSingular + " from \'./components/Delete" + titleCaseSingular + "/Delete" + titleCaseSingular + "\'\n\nimport \'normalize.css\'\nimport \'./App.css\'\n\nfunction App() {\n\t\treturn (\n\t\t\t<Router>\n\t\t\t\t<div className=\"App\">\n\t\t\t\t\t<Header />\n\t\t\t\t\t<main>\n\t\t\t\t\t\t<Switch>\n\t\t\t\t\t\t\t<Route exact path=\'/\' component={Read" + titleCasePlural + "} />\n\t\t\t\t\t\t\t<Route path=\'/create\' component={Create" + titleCaseSingular + "} />\n\t\t\t\t\t\t\t<Route path=\'/delete\' component={Delete" + titleCaseSingular + "} />\n\t\t\t\t\t\t\t<Route path=\'/:" + lowerCaseSingular + "id\' component={Read" + titleCaseSingular + "} />\n\t\t\t\t\t\t</Switch>\n\t\t\t\t\t</main>\n\t\t\t\t</div>\n\t\t\t</Router>\n\t\t)\n}\n\nexport default App\n"},
{ file: 'frontend/src/App.test.js',
  content: "import React from \'react\';\nimport { render } from \'@testing-library/react\';\nimport App from \'./App\';\n\ntest(\'renders learn react link\', () => {\n  const { getByText } = render(<App />);\n  const linkElement = getByText(/learn react/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"},
{ file: 'frontend/src/index.css',
  content: "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\',\n    \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \'Courier New\',\n    monospace;\n}\n"},
{ file: 'frontend/src/index.js',
  content: "import React from \'react\';\nimport ReactDOM from \'react-dom\';\nimport \'./index.css\';\nimport App from \'./App\';\nimport * as serviceWorker from \'./serviceWorker\';\n\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  document.getElementById(\'root\')\n);\n\n// If you want your app to work offline and load faster, you can change\n// unregister() to register() below. Note this comes with some pitfalls.\n// Learn more about service workers: https://bit.ly/CRA-PWA\nserviceWorker.unregister();\n"},
{ file: 'frontend/src/serviceWorker.js',
  content: "// This optional code is used to register a service worker.\n// register() is not called by default.\n\n// This lets the app load faster on subsequent visits in production, and gives\n// it offline capabilities. However, it also means that developers (and users)\n// will only see deployed updates on subsequent visits to a page, after all the\n// existing tabs open on the page have been closed, since previously cached\n// resources are updated in the background.\n\n// To learn more about the benefits of this model and instructions on how to\n// opt-in, read https://bit.ly/CRA-PWA\n\nconst isLocalhost = Boolean(\n  window.location.hostname === \'localhost\' ||\n    // [::1] is the IPv6 localhost address.\n    window.location.hostname === \'[::1]\' ||\n    // 127.0.0.0/8 are considered localhost for IPv4.\n    window.location.hostname.match(\n      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/\n    )\n);\n\nexport function register(config) {\n  if (process.env.NODE_ENV === \'production\' && \'serviceWorker\' in navigator) {\n    // The URL constructor is available in all browsers that support SW.\n    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);\n    if (publicUrl.origin !== window.location.origin) {\n      // Our service worker won\'t work if PUBLIC_URL is on a different origin\n      // from what our page is served on. This might happen if a CDN is used to\n      // serve assets; see https://github.com/facebook/create-react-app/issues/2374\n      return;\n    }\n\n    window.addEventListener(\'load\', () => {\n      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;\n\n      if (isLocalhost) {\n        // This is running on localhost. Let\'s check if a service worker still exists or not.\n        checkValidServiceWorker(swUrl, config);\n\n        // Add some additional logging to localhost, pointing developers to the\n        // service worker/PWA documentation.\n        navigator.serviceWorker.ready.then(() => {\n          console.log(\n            \'This web app is being served cache-first by a service \' +\n              \'worker. To learn more, visit https://bit.ly/CRA-PWA\'\n          );\n        });\n      } else {\n        // Is not localhost. Just register service worker\n        registerValidSW(swUrl, config);\n      }\n    });\n  }\n}\n\nfunction registerValidSW(swUrl, config) {\n  navigator.serviceWorker\n    .register(swUrl)\n    .then(registration => {\n      registration.onupdatefound = () => {\n        const installingWorker = registration.installing;\n        if (installingWorker == null) {\n          return;\n        }\n        installingWorker.onstatechange = () => {\n          if (installingWorker.state === \'installed\') {\n            if (navigator.serviceWorker.controller) {\n              // At this point, the updated precached content has been fetched,\n              // but the previous service worker will still serve the older\n              // content until all client tabs are closed.\n              console.log(\n                \'New content is available and will be used when all \' +\n                  \'tabs for this page are closed. See https://bit.ly/CRA-PWA.\'\n              );\n\n              // Execute callback\n              if (config && config.onUpdate) {\n                config.onUpdate(registration);\n              }\n            } else {\n              // At this point, everything has been precached.\n              // It\'s the perfect time to display a\n              // \"Content is cached for offline use.\" message.\n              console.log(\'Content is cached for offline use.\');\n\n              // Execute callback\n              if (config && config.onSuccess) {\n                config.onSuccess(registration);\n              }\n            }\n          }\n        };\n      };\n    })\n    .catch(error => {\n      console.error(\'Error during service worker registration:\', error);\n    });\n}\n\nfunction checkValidServiceWorker(swUrl, config) {\n  // Check if the service worker can be found. If it can\'t reload the page.\n  fetch(swUrl, {\n    headers: { \'Service-Worker\': \'script\' },\n  })\n    .then(response => {\n      // Ensure service worker exists, and that we really are getting a JS file.\n      const contentType = response.headers.get(\'content-type\');\n      if (\n        response.status === 404 ||\n        (contentType != null && contentType.indexOf(\'javascript\') === -1)\n      ) {\n        // No service worker found. Probably a different app. Reload the page.\n        navigator.serviceWorker.ready.then(registration => {\n          registration.unregister().then(() => {\n            window.location.reload();\n          });\n        });\n      } else {\n        // Service worker found. Proceed as normal.\n        registerValidSW(swUrl, config);\n      }\n    })\n    .catch(() => {\n      console.log(\n        \'No internet connection found. App is running in offline mode.\'\n      );\n    });\n}\n\nexport function unregister() {\n  if (\'serviceWorker\' in navigator) {\n    navigator.serviceWorker.ready\n      .then(registration => {\n        registration.unregister();\n      })\n      .catch(error => {\n        console.error(error.message);\n      });\n  }\n}\n"},
{ file: 'frontend/src/setupTests.js',
  content: "// jest-dom adds custom jest matchers for asserting on DOM nodes.\n// allows you to do things like:\n// expect(element).toHaveTextContent(/react/i)\n// learn more: https://github.com/testing-library/jest-dom\nimport \'@testing-library/jest-dom/extend-expect\';\n"},
{ file: 'frontend/src/hooks/useInput.js',
  content: "import { useState } from \'react\'\n\nfunction useInput(initialValue) {\n\tconst [value, setValue] = useState(initialValue)\n\t\n\tfunction handleChange(e) {\n\t\tsetValue(e.target.value)\n\t}\n\t\n\treturn [value, handleChange]\n}\n\nexport default useInput"},
{ file: 'frontend/src/hooks/useSelect.js',
	content: "import { useState } from \'react\'\n\nfunction useSelect(initialValue) {\n\tconst [value, setValue] = useState(initialValue)\n\t\n\tfunction handleChange(e) {\n\t\tsetValue(e.target.value)\n\t}\n\t\n\treturn [value, handleChange]\n}\n\nexport default useSelect"},
finalUpdate,
	/*
{ file: 'frontend/src/components/Update' + titleCaseSingular + '/Update' + titleCaseSingular + '.jsx',
	content: "import React, { useState } from \'react\'\nimport axios from \'axios\'\n\nconst Update" + titleCaseSingular + " = (props) => {\n\tconst [msg, setMsg] = useState(\'\')\n\tconst [msgColor, setMsgColor] = useState(\'#0f0\')\n\t\n\tfunction update" + titleCaseSingular + "(" + lowerCaseSingular + "id) {\n\t\taxios.put(`api/" + lowerCasePlural + "/${" + lowerCaseSingular + "id}`,\n\t\t\t{\n\t\t\t\ttitle: props." + lowerCaseSingular + ".title,\n\t\t\t\tdirector: props." + lowerCaseSingular + ".director,\n\t\t\t\tyear: props." + lowerCaseSingular + ".year\n\t\t\t}\n\t\t)\n\t\t.then(res => {\n\t\t\tconsole.log(\'" + lowerCaseSingular + " updated\')\n\t\t\t// show message\n\t\t\tsetMsg(\'" + titleCaseSingular + " updated!\')\n\t\t\tsetMsgColor(\'#0ff\')\n\t\t})\n\t\t.catch(err => {\n\t\t\tconsole.error(err)\n\t\t\t// show message\n\t\t\tsetMsg(\'Problem updating " + lowerCaseSingular + "!\')\n\t\t\tsetMsgColor(\'#f00\')\n\t\t})\n\t}\n\t\n\tfunction handleSubmit(e) {\n\t\te.preventDefault()\n\t\t// remove from db\n\t\tupdate" + titleCaseSingular + "(props." + lowerCaseSingular + "id)\n\t\t// clear form\n\t\tdocument.getElementById(\'update-" + lowerCaseSingular + "-form\').reset()\n\t}\n\t\n\treturn(\n\t\t<div>\n\t\t\t<div className=\"update-" + lowerCaseSingular + "\"><br />\n\t\t\t\t<h3>Update " + titleCaseSingular + "</h3>\n\t\t\t\t<p id=\"msg\" style={{fontWeight: \'bold\', color: msgColor}}>{msg}</p>\n\t\t\t\t<form onSubmit={handleSubmit} id=\"update-" + lowerCaseSingular + "-form\">\n\t\t\t\t\t<label htmlFor=\"title\">Title:</label><br />\n\t\t\t\t\t<input type=\"text\" name=\"title\" id=\"title\" value={props." + lowerCaseSingular + ".title} onChange={props.useInputTitleChange} /><br />\n\t\t\t\t\t<label htmlFor=\"director\">Director:</label><br />\n\t\t\t\t\t<input type=\"text\" name=\"director\" id=\"director\" value={props." + lowerCaseSingular + ".director} onChange={props.useInputDirectorChange} /><br />\n\t\t\t\t\t<label htmlFor=\"year\">Year:</label><br />\n\t\t\t\t\t<input type=\"text\" name=\"year\" id=\"year\" value={props." + lowerCaseSingular + ".year} onChange={props.useInputYearChange} /><br />\n\t\t\t\t\t<input type=\"submit\" value=\"Update " + titleCaseSingular + "\"/>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t)\n}\n\nexport default Update" + titleCaseSingular + ""},
*/
{ file: 'frontend/src/components/Update' + titleCaseSingular + '/Update' + titleCaseSingular + '.scss',
	content: ".update-" + lowerCaseSingular + " {\n\t\n}\n\n#update-" + lowerCaseSingular + "-form {\n\t\n}"},
{ file: 'frontend/src/components/Read' + titleCasePlural + '/Read' + titleCasePlural + '.jsx',
	content: "import React, { useState, useEffect } from \'react\'\nimport axios from \'axios\'\n\nimport \'./Read" + titleCasePlural + ".scss\'\n\nfunction Read" + titleCasePlural + "() {\n\tconst [" + lowerCasePlural + ", set" + titleCasePlural + "] = useState([])\n\t\n\tuseEffect(() => {\n\t\tget" + titleCasePlural + "()\n\t}, [])\n\t\n\tfunction get" + titleCasePlural + " () {\n\t\taxios.get(\'/api/" + lowerCasePlural + "\')\n\t\t\t.then(res => {\n\t\t\t\tif (res.data) {\n\t\t\t\t\tset" + titleCasePlural + "(res.data)\n\t\t\t\t\tconsole.log(res.data)\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(err => console.error(err))\n\t}\n\t\n\treturn (\n\t\t<div className=\"read-" + lowerCasePlural + "\">\n\t\t\t{\n\t\t\t\t" + lowerCasePlural + ".map(" + lowerCaseSingular + " => (\n\t\t\t\t<p key={" + lowerCaseSingular + "._id}>\n\t\t\t\t\t<a href={`/${" + lowerCaseSingular + "._id}`}>{" + lowerCaseSingular + "." + config.title + "}</a>\n\t\t\t\t</p>\n\t\t\t\t))\n\t\t\t}\n\t\t</div>\n\t)\n}\n\nexport default Read" + titleCasePlural + ""},
{ file: 'frontend/src/components/Read' + titleCasePlural + '/Read' + titleCasePlural + '.scss',
	content: ".read-" + lowerCasePlural + " {\n\t\n}"},
finalRead,
/*
{ file: 'frontend/src/components/Read' + titleCaseSingular + '/Read' + titleCaseSingular + '.jsx',
  content: "import React, { useState, useEffect } from \'react\'\nimport axios from \'axios\'\nimport { useParams } from \'react-router-dom\'\n\nimport Update" + titleCaseSingular + " from \'../Update" + titleCaseSingular + "/Update" + titleCaseSingular + "\'\n\nimport \'./Read" + titleCaseSingular + ".scss\'\n\nfunction Read" + titleCaseSingular + "() {\n\tconst [" + lowerCaseSingular + ", set" + titleCaseSingular + "] = useState(\n\t\t{\n\t\t\ttitle: \'\',\n\t\t\tdirector: \'\',\n\t\t\tyear: \'\'\n\t\t}\n\t)\n\tconst [isUpdateHidden, setIsUpdateHidden] = useState(true)\t\n\t\n\tlet { " + lowerCaseSingular + "id } = useParams()\n\t\n\t// get " + lowerCaseSingular + " details\n\tuseEffect(() => {\n\t\taxios.get(`/api/" + lowerCasePlural + "/${" + lowerCaseSingular + "id}`)\n\t\t\t.then(res => {\n\t\t\t\tset" + titleCaseSingular + "(res.data)\n\t\t\t\tconsole.log(res.data)\n\t\t\t})\n\t\t\t.catch(err => console.error(err))\n\t}, [" + lowerCaseSingular + "id])\n\t\n\tfunction handleEditButton(e) {\n\t\te.preventDefault()\n\t\tsetIsUpdateHidden(!isUpdateHidden)\n\t}\n\n  function handleInputChange(e) {\n    let editBlock\n    switch (e.target.name) {\n      case \'title\':\n        editBlock = {\n\t\t\t\t\ttitle: e.target.value,\n\t\t\t\t\tdirector: " + lowerCaseSingular + ".director,\n\t\t\t\t\tyear: " + lowerCaseSingular + ".year\n        }\n        break\n      case \'director\':\n        editBlock = {\n\t\t\t\t\ttitle: " + lowerCaseSingular + ".title,\n\t\t\t\t\tdirector: e.target.value,\n\t\t\t\t\tyear: " + lowerCaseSingular + ".year\n        }\n        break\n      case \'year\':\n        editBlock = {\n\t\t\t\t\ttitle: " + lowerCaseSingular + ".title,\n\t\t\t\t\tdirector: " + lowerCaseSingular + ".director,\n\t\t\t\t\tyear: e.target.value\n        }\n        break\n\n      default:\n        console.log(\'The form is confused...\')\n        break\n    }\n\n    set" + titleCaseSingular + "(editBlock)\n  }\n\t\n\treturn (\n\t\t<div>\n\t\t\t<div className=\"read-" + lowerCaseSingular + "\">\n\t\t\t\t<h2>{" + lowerCaseSingular + ".title}</h2>\n\t\t\t\tDirector: {" + lowerCaseSingular + ".director}<br />\n\t\t\t\tYear: {" + lowerCaseSingular + ".year}<br /><br />\n\t\t\t\t<form>\n\t\t\t\t\t<input type=\"submit\" value={isUpdateHidden ? \"Edit " + titleCaseSingular + "\": \"Nevermind\"} onClick={handleEditButton}/>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t\t{ !isUpdateHidden && <Update" + titleCaseSingular + " \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + lowerCaseSingular + "={" + lowerCaseSingular + "}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t" + lowerCaseSingular + "id={" + lowerCaseSingular + "id}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\thandleInputChange={handleInputChange} /> }\n\t\t</div>\n\t)\n}\n\nexport default Read" + titleCaseSingular + ""},
*/
{ file: 'frontend/src/components/Read' + titleCaseSingular + '/Read' + titleCaseSingular + '.scss',
  content: ".read-" + lowerCaseSingular + " {\n\t\n}"},
{ file: 'frontend/src/components/Header/Header.jsx',
  content: "import React from \'react\'\nimport { Link } from \'react-router-dom\'\n\nimport \'./Header.scss\'\n\nfunction Header() {\n\treturn (\n\t\t<div className=\"header\">\n\t\t\t<nav>\n\t\t\t\t<Link className=\'option\' to=\'/create\'>\n\t\t\t\t\tCreate\n\t\t\t\t</Link>\n\t\t\t\t<Link className=\'option\' to=\'/delete\'>\n\t\t\t\t\tDelete\n\t\t\t\t</Link>  \n\t\t\t</nav>\n\t\t\t<h1>\n\t\t\t\t<Link className=\'option\' to=\'/\'>\n\t\t\t\t\t" + titleCaseSingular + " DB\n\t\t\t\t</Link>\n\t\t\t</h1>\n\t\t</div>\n\t)\n}\n\nexport default Header"},
{ file: 'frontend/src/components/Header/Header.scss',
  content: ".header {\n}\n\n.option {\n\tpadding-right: 10px;\n}"},
{ file: 'frontend/src/components/Delete' + titleCaseSingular + '/Delete' + titleCaseSingular + '.jsx',
  content: "import React, { useState, useEffect } from \'react\'\nimport axios from \'axios\'\n\nimport useSelect from \'../../hooks/useSelect\'\n\t\nimport \'./Delete" + titleCaseSingular + ".scss\'\n\nfunction Delete" + titleCaseSingular + "() {\n\tconst [id, setId] = useSelect(null)\n\tconst [" + lowerCasePlural + ", set" + titleCasePlural + "] = useState([])\n\tconst [msg, setMsg] = useState(\'\')\n\tconst [msgColor, setMsgColor] = useState(\'#0f0\')\n\t\n\tuseEffect(() => {\n\t\tget" + titleCasePlural + "()\n\t}, [])\n\t\n\tfunction get" + titleCasePlural + "() {\n\t\taxios.get(\'/api/" + lowerCasePlural + "\')\n\t\t\t.then(res => {\n\t\t\t\tif (res.data) {\n\t\t\t\t\tset" + titleCasePlural + "(res.data)\n\t\t\t\t\tconsole.log(res.data)\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(err => console.error(err))\n\t}\n\t\n\tfunction handleSubmit(e) {\n\t\te.preventDefault()\n\t\t// remove from db\n\t\tdel" + titleCaseSingular + "(id)\n\t\t// get " + lowerCaseSingular + " list again\n\t\tget" + titleCasePlural + "()\n\t}\n\t\n\tfunction del" + titleCaseSingular + "(id) {\n\t\taxios.delete(`api/" + lowerCasePlural + "/${id}`)\n\t\t.then(res => {\n\t\t\t\tconsole.log(\'" + lowerCaseSingular + " removed from db\')\n\t\t\t\t// show message\n\t\t\t\tsetMsg(\'" + titleCaseSingular + " removed from database!\')\n\t\t\t\tsetMsgColor(\'#0ff\')\n\t\t})\n\t\t.catch(err => {\n\t\t\tconsole.error(err)\n\t\t\t// show message\n\t\t\tsetMsg(\'Problem removing " + titleCaseSingular + " from database!\')\n\t\t\tsetMsgColor(\'#f00\')\n\t\t})\n\t}\n\t\n\treturn (\n\t\t<div className=\"delete-" + lowerCaseSingular + "\">\n\t\t<h2>Delete " + titleCaseSingular + "</h2>\n\t\t<p id=\"msg\" style={{fontWeight: \'bold\', color: msgColor}}>{msg}</p>\n\t\t<form onSubmit={handleSubmit} id=\"delete-" + lowerCaseSingular + "-form\">\n\t\t\t<label htmlFor=\"title\">Title:</label><br /><br />\n\t\t\t<select id=\"" + lowerCaseSingular + "\" name=\"" + lowerCaseSingular + "\" onChange={setId}>\n\t\t\t{\n\t\t\t\t" + lowerCasePlural + ".map(" + lowerCaseSingular + " => (\n\t\t\t\t\t<option key={" + lowerCaseSingular + "._id} value={" + lowerCaseSingular + "._id}>{" + lowerCaseSingular + ".title}</option>\n\t\t\t\t))\n\t\t\t}\n\t\t\t</select>\n\t\t\t<br />\n\t\t\t<input type=\"submit\" value=\"Remove " + titleCaseSingular + " from DB\"/>\n\t\t</form>\n\t\t</div>\n\t)\n}\n\nexport default Delete" + titleCaseSingular + ""},
{ file: 'frontend/src/components/Delete' + titleCaseSingular + '/Delete' + titleCaseSingular + '.scss',
  content: ".delete-" + lowerCaseSingular + " {\n\t\n}"},
{ file: 'frontend/src/components/Create' + titleCaseSingular + '/Create' + titleCaseSingular + '.jsx',
  content: "import React, { useState } from \'react\'\nimport axios from \'axios\'\n\nimport useInput from \'../../hooks/useInput\'\nimport \'./Create" + titleCaseSingular + ".scss\'\n\nfunction Create" + titleCaseSingular + "() {\n\tconst [title, setTitle] = useInput(null)\n\tconst [director, setDirector] = useInput(null)\n\tconst [year, setYear] = useInput(null)\n\tconst [msg, setMsg] = useState(\'\')\n\tconst [msgColor, setMsgColor] = useState(\'#0f0\')\n\t\n\tfunction handleSubmit(e) {\n\t\te.preventDefault()\n\t\t// add to db\n\t\tpost" + titleCaseSingular + "(\n\t\t\ttitle,\n\t\t\tdirector,\n\t\t\tyear\n\t\t)\n\t\t// clear form\n\t\tdocument.getElementById(\'create-" + lowerCaseSingular + "-form\').reset()\n\t}\n\t\n\t// TODO test this\n\tfunction post" + titleCaseSingular + "(title, director, year) {\n\t\taxios.post(\'api/" + lowerCasePlural + "\', {\n\t\t\ttitle: title,\n\t\t\tdirector: director,\n\t\t\tyear: year\n\t\t})\n\t\t.then(res => {\n\t\t\tif (res.data) {\n\t\t\t\tconsole.log(res.data)\n\t\t\t\tconsole.log(\'" + lowerCaseSingular + " added to db\')\n\t\t\t\t// show message\n\t\t\t\tsetMsg(\'" + titleCaseSingular + " added to database!\')\n\t\t\t\tsetMsgColor(\'#0ff\')\n\t\t\t}\n\t\t})\n\t\t.catch(err => {\n\t\t\tconsole.error(err)\n\t\t\t// show message\n\t\t\tsetMsg(\'Problem adding " + lowerCaseSingular + " to database!\')\n\t\t\tsetMsgColor(\'#f00\')\n\t\t})\n\t}\n\t\n\treturn (\n\t\t<div className=\"create-" + lowerCaseSingular + "\">\n\t\t<h2>Create " + titleCaseSingular + "</h2>\n\t\t<p id=\"msg\" style={{fontWeight: \'bold\', color: msgColor}}>{msg}</p>\n\t\t<form onSubmit={handleSubmit} id=\"create-" + lowerCaseSingular + "-form\">\n\t\t\t<label htmlFor=\"title\">Title:</label><br />\n\t\t\t<input type=\"text\" name=\"title\" onChange={setTitle} required />\n\t\t\t<br />\n\t\t\t<label htmlFor=\"director\">Director:</label><br />\n\t\t\t<input type=\"text\" name=\"director\" onChange={setDirector} required />\n\t\t\t<br />\n\t\t\t<label htmlFor=\"year\">Year:</label><br />\n\t\t\t<input type=\"text\" name=\"year\" onChange={setYear} required />\n\t\t\t<br />\n\t\t\t<input type=\"submit\" value=\"Add " + titleCaseSingular + " to DB\"/>\n\t\t</form>\n\t\t</div>\n\t)\n}\n\nexport default Create" + titleCaseSingular + ""},
{ file: 'frontend/src/components/Create' + titleCaseSingular + '/Create' + titleCaseSingular + '.scss',
  content: ".create-" + lowerCaseSingular + " {\n\t\n}"},
{ file: 'frontend/public/index.html',
  content: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <link rel=\"icon\" href=\"%PUBLIC_URL%/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <meta name=\"theme-color\" content=\"#000000\" />\n    <meta\n      name=\"description\"\n      content=\"Web site created using create-react-app\"\n    />\n    <link rel=\"apple-touch-icon\" href=\"%PUBLIC_URL%/logo192.png\" />\n    <!--\n      manifest.json provides metadata used when your web app is installed on a\n      user\'s mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/\n    -->\n    <link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\" />\n    <!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n    <title>" + config.name + "</title>\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id=\"root\"></div>\n    <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  </body>\n</html>\n"},
{ file: 'frontend/public/manifest.json',
  content: "{\n  \"short_name\": \"React App\",\n  \"name\": \"Create React App Sample\",\n  \"icons\": [\n    {\n      \"src\": \"favicon.ico\",\n      \"sizes\": \"64x64 32x32 24x24 16x16\",\n      \"type\": \"image/x-icon\"\n    },\n    {\n      \"src\": \"logo192.png\",\n      \"type\": \"image/png\",\n      \"sizes\": \"192x192\"\n    },\n    {\n      \"src\": \"logo512.png\",\n      \"type\": \"image/png\",\n      \"sizes\": \"512x512\"\n    }\n  ],\n  \"start_url\": \".\",\n  \"display\": \"standalone\",\n  \"theme_color\": \"#000000\",\n  \"background_color\": \"#ffffff\"\n}\n"},
{ file: 'frontend/public/robots.txt',
  content: "# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow:\n"},
{ file: 'bin/www',
  content: "#!/usr/bin/env node\n\n/**\n * Module dependencies.\n */\n\nconst app = require(\'../app\');\nconst debug = require(\'debug\')(\'aa2-mern:server\');\nconst http = require(\'http\');\n\n/**\n * Get port from environment and store in Express.\n */\n\nconst port = normalizePort(process.env.PORT || \'9000\'); // changed from 3000\napp.set(\'port\', port);\n\n/**\n * Create HTTP server.\n */\n\nconst server = http.createServer(app);\n\n/**\n * Listen on provided port, on all network interfaces.\n */\n\nserver.listen(port);\nserver.on(\'error\', onError);\nserver.on(\'listening\', onListening);\n\n/**\n * Normalize a port into a number, string, or false.\n */\n\nfunction normalizePort(val) {\n  const port = parseInt(val, 10);\n\n  if (isNaN(port)) {\n    // named pipe\n    return val;\n  }\n\n  if (port >= 0) {\n    // port number\n    return port;\n  }\n\n  return false;\n}\n\n/**\n * Event listener for HTTP server \"error\" event.\n */\n\nfunction onError(error) {\n  if (error.syscall !== \'listen\') {\n    throw error;\n  }\n\n  const bind = typeof port === \'string\'\n    ? \'Pipe \' + port\n    // : \'Port \' + port;\n    : port;\n\n  // handle specific listen errors with friendly messages\n  switch (error.code) {\n    case \'EACCES\':\n      console.error(bind + \' requires elevated privileges\');\n      process.exit(1);\n      break;\n    case \'EADDRINUSE\':\n      console.error(bind + \' is already in use\');\n      process.exit(1);\n      break;\n    default:\n      throw error;\n  }\n}\n\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\nfunction onListening() {\n  const addr = server.address();\n  const bind = typeof addr === \'string\'\n    ? \'pipe \' + addr\n    // : \'port \' + addr.port;\n    : addr.port;\n  // debug(\'Listening on \' + bind);\n  debug(\'Listening on http://localhost:\' + bind);\n}\n"},
{ file: 'app/views/detail.pug',
  content: "extends layout\n\nblock content\n\th1\n\t\ta(href=`/`) #{title}\n\th2 #{" + lowerCaseSingular + ".title}\n\tp Year: #{" + lowerCaseSingular + ".year}\n\tp Director: #{" + lowerCaseSingular + ".director}"},
{ file: 'app/views/error.pug',
  content: "extends layout\n\nblock content\n\th1= message\n\th2= detail\n\th2= error.status\n\tpre #{error.stack}\n"},
{ file: 'app/views/index.pug',
  content: "extends layout\n\nblock content\n\th1= title\n\teach val in " + lowerCasePlural + "\n\t\tp\n\t\t\ta(href=`/${val._id}`) #{val.title}"},
{ file: 'app/views/layout.pug',
  content: "doctype html\nhtml\n  head\n    title= title\n    link(rel=\'stylesheet\', href=\'/stylesheets/style.css\')\n  body\n    block content\n"},
{ file: 'app/routes/index.js',
  content: "const express = require(\'express\');\nconst router = express.Router();\nconst ctrlHome = require(\'../controllers/home\');\nconst ctrlDetail = require(\'../controllers/detail\');\n\n/* Home */\nrouter.get(\'/\', ctrlHome.home);\n\n/* Detail */\nrouter.get(\'/:" + lowerCaseSingular + "id\', ctrlDetail.detail);\n\nmodule.exports = router;"},
{ file: 'app/controllers/detail.js',
  content: "const rp = require(\'request-promise-native\');\n\nconst server = `http://localhost:${process.env.PORT}`;\n\nmodule.exports.detail = async (req, res) => {\n\ttry {\n\t\tlet " + lowerCaseSingular + " = JSON.parse(await rp.get(`${server}/api/" + lowerCasePlural + "/${req.params." + lowerCaseSingular + "id}`));\n\t\tconsole.log(`" + lowerCaseSingular + ": ${" + lowerCaseSingular + "}`)\n\t\tres.render(\n\t\t\t\'detail\', \n\t\t\t{\n\t\t\t\ttitle: \'" + titleCaseSingular + " DB\',\n\t\t\t\t" + lowerCaseSingular + ": " + lowerCaseSingular + "\n\t\t\t},\n\t\t);\n\t} catch (err) {\n\t\tres.render(\n\t\t\t\'error\',\n\t\t\t{\n\t\t\t\tmessage: \"Server Error\",\n\t\t\t\tdetail: \"Probably a bad " + lowerCaseSingular + "id\",\n\t\t\t\terror: err\n\t\t\t}\n\t\t);\n\t}\n}"},
{ file: 'app/controllers/home.js',
  content: "const rp = require(\'request-promise-native\');\n\nconst server = `http://localhost:${process.env.PORT}`;\n\nmodule.exports.home = async (req, res) => {\n\tlet " + lowerCasePlural + " = JSON.parse(await rp.get(`${server}/api/" + lowerCasePlural + "`));\n\n\tres.render(\n\t\t\'index\', \n\t\t{\n\t\t\ttitle: \'" + titleCaseSingular + " DB\',\n\t\t\t" + lowerCasePlural + ": " + lowerCasePlural + "\n\t\t},\n\t);\n}\n"},
{ file: 'api/routes/index.js',
  content: "var express = require(\'express\');\nvar router = express.Router();\nvar ctrl" + titleCasePlural + " = require(\'../controllers/" + lowerCasePlural + "\');\n\n/* " + titleCasePlural + " */\nrouter.get(\'/" + lowerCasePlural + "\', ctrl" + titleCasePlural + "." + lowerCasePlural + "List); // list all\nrouter.post(\'/" + lowerCasePlural + "\', ctrl" + titleCasePlural + "." + lowerCasePlural + "Create); // C\nrouter.get(\'/" + lowerCasePlural + "/:" + lowerCaseSingular + "id\', ctrl" + titleCasePlural + "." + lowerCasePlural + "ReadOne); // R\nrouter.put(\'/" + lowerCasePlural + "/:" + lowerCaseSingular + "id\', ctrl" + titleCasePlural + "." + lowerCasePlural + "UpdateOne); // U\nrouter.delete(\'/" + lowerCasePlural + "/:" + lowerCaseSingular + "id\', ctrl" + titleCasePlural + "." + lowerCasePlural + "DeleteOne); // D\n\nmodule.exports = router;"},
{ file: 'api/models/db.js',
  content: "const mongoose = require(\'mongoose\');\n\n/*Set URI*/\nconst dbName = \'" + upperCasePlural +"_DB\';\nlet dbUri = `mongodb://localhost/${dbName}`;\n\nif (process.env.NODE_ENV === \'production\') {\n  console.log(\'You are running in production!\');\n  dbUri = process.env.MONGODB_URI;\n}\nif (process.env.NODE_ENV === \'development\') {\n  console.log(\'You are running in development!\');\n}\n\n/*DB Connect*/\nmongoose.connect(\n\tdbUri, \n\t{\n\t\tuseNewUrlParser: true,\n\t\tuseFindAndModify: false,\n\t\tuseUnifiedTopology: true\n\t}\n);\n\n/*Event Logs*/\nmongoose.connection.on(\'connected\', function () {\n  console.log(\'Mongoose connected to \' + dbUri);\n});\nmongoose.connection.on(\'error\', function (err) {\n  console.log(\'Mongoose connection error: \' + err);\n});\nmongoose.connection.on(\'disconnected\', function () {\n  console.log(\'Mongoose disconnected\');\n});\n\nconst gracefulShutdown = function (msg, callback) {\n  mongoose.connection.close(function () {\n    console.log(\'Mongoose disconnected through \' + msg);\n    callback();\n  });\n};\n\n/*Use gracefulShutdown()*/\nprocess.once(\'SIGUSR2\', function () {\n  gracefulShutdown(\'nodemon\', function () {\n    process.kill(process.pid, \'SIGUSR2\');\n  });\n});\nprocess.on(\'SIGINT\', function () {\n  gracefulShutdown(\'app termination\', function () {\n    process.exit(0);\n  });\n});\nprocess.on(\'SIGTERM\', function () { // TODO necessary?\n  gracefulShutdown(\'Heroku app shutdown\', function () {\n    process.exit(0);\n  });\n});\n\nrequire(\'./" + lowerCasePlural + "\');"},
{ file: 'api/controllers/' + lowerCasePlural + '.js',
	content: "const mongoose = require(\'mongoose\');\nmongoose.set(\'returnOriginal\', false);\nconst " + titleCaseSingular + " = mongoose.model(\'" + titleCaseSingular + "\');\n\nconst sendJSONresponse = function(res, status, content) {\n  res.status(status);\n  res.json(content);\n};\n\n/* GET /api/" + lowerCasePlural + "/ */\nmodule.exports." + lowerCasePlural + "List = async (req, res) => {\n\ttry {\n\t\tconst " + lowerCasePlural + " = await " + titleCaseSingular + ".find({}); // find all documents\n\t\tconsole.log(" + lowerCasePlural + ");\n\t\tsendJSONresponse(res, 200, " + lowerCasePlural + ");\n\t} catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 400, err);\n\t}\n};\n\n/* POST /api/" + lowerCasePlural + "/ (Create) */\nmodule.exports." + lowerCasePlural + "Create = async (req, res) => {\t\n\tconst " + lowerCaseSingular + " = new " + titleCaseSingular + "(req.body);\n\ttry {\n\t\tawait " + lowerCaseSingular + ".save();\n\t\tsendJSONresponse(res, 201, " + lowerCaseSingular + ");\n\t} catch (err) {\n\t\tconsole.log(err.message)\n\t\tsendJSONresponse(res, 500, err);\n\t}\n};\n\n/* GET /api/" + lowerCasePlural + "/:" + lowerCaseSingular + "id (Read) */\nmodule.exports." + lowerCasePlural + "ReadOne = async (req, res) => {\n\ttry {\n\t\tconst " + lowerCaseSingular + " = await " + titleCaseSingular + ".findById(req.params." + lowerCaseSingular + "id);\n\t\tif (!" + lowerCaseSingular + ") {\n\t\t\tsendJSONresponse(res, 404);\n\t\t\treturn;\n\t\t}\n\t\tconsole.log(" + lowerCaseSingular + ");\n\t\tsendJSONresponse(res, 200, " + lowerCaseSingular + ");\n\t} catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 500, err);\n\t}\n};\n\n/* PUT /api/" + lowerCasePlural + "/:" + lowerCaseSingular + "id (Update) */\nmodule.exports." + lowerCasePlural + "UpdateOne = async(req, res) => {\n\tconst " + lowerCaseSingular + "id = req.params." + lowerCaseSingular + "id;\n\tconsole.log(\'" + lowerCaseSingular + "id: \', " + lowerCaseSingular + "id)\n\ttry {\n\t\tawait " + titleCaseSingular + ".findByIdAndUpdate(" + lowerCaseSingular + "id, req.body);\n\t\tsendJSONresponse(res, 200, req.query);\n\t} catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 500, err);\n\t}\n}\n\n/* DELETE /api/" + lowerCasePlural + "/:" + lowerCaseSingular + "id (Delete) */\nmodule.exports." + lowerCasePlural + "DeleteOne = async (req, res) => {\n	try {\n\t\tconst " + lowerCaseSingular + "id = req.params." + lowerCaseSingular + "id;\n\t\tconst " + lowerCaseSingular + " = await " + titleCaseSingular + ".findByIdAndDelete(" + lowerCaseSingular + "id);\n\t\tif (!" + lowerCaseSingular + ") {\n\t\t\tsendJSONresponse(res, 404);\n\t\t\treturn;\n\t\t}\n\t\tconsole.log(\"" + lowerCaseSingular + " id \" + " + lowerCaseSingular + "id + \" deleted\");\n\t\tsendJSONresponse(res, 204, null);\n\t} catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 500, err);\n\t}\n};"},
finalModel
]

async function dirMaker() {
	how_many_dirs = dirs.length
	for (let x = 0; x < how_many_dirs; x++) {
		try {
			if (!fs.existsSync(`${dirs[x]}/`)) {
				await fs.mkdirSync(`${dirs[x]}/`)
				console.log(`AA: created ${dirs[x]}/`)
			} else {
				console.log(`AA: skipping ${dirs[x]}/`)
			}
		} catch (err) {
			console.error('! Problem Creating Directories !')
			throw err
		}
	}
	console.log('* Directories Created *')
}

async function fileMaker() {
	how_many_files = files.length
	for (let x = 0; x < how_many_files; x++) {
		try {
			await fs.writeFile(`${files[x].file}`, `${files[x].content}`)
			console.log(`AA: wrote ${files[x].file}`)
		} catch (err) {
			console.log(`! Error Writing ${files[x].file} !`)
		}
	}
	console.log('* Files Created *')
}

/* Copies the assets/ to their final destination */
function copyAssets() {
	const assets = [
		{ name: 'favicon.ico', 
			dest: './public/' },
		{ name: 'logo192.png', 
			dest: './public/' },
		{ name: 'logo512.png', 
			dest: './public/' },
	]
	
	for (const asset of assets) {
		const src = fs.createReadStream(asset_dir + asset.name)
		const dest = fs.createWriteStream(asset.dest + asset.name)
		src.pipe(dest)
	}
}

/* Installs the project dependencies */
function promiseFromChildProcess(child) {
	return new Promise(function (resolve, reject) {
		child.addListener("error", reject)
		child.addListener("exit", resolve)
	})
}

const exec = require('child_process').exec

async function installDeps() {
	const serverDeps = exec(`${packMan} install`)
	const clientDeps = exec(`cd frontend; ${packMan} install`)
	
	try {
		await promiseFromChildProcess(serverDeps)
		console.log('\n* Server Dependencies Installed *')
		await promiseFromChildProcess(clientDeps)
		console.log('\n* Client Dependencies Installed *')
		spinner.stop()
		console.log('\n*** App Generated ***\n\n\'npm run dev\' to begin.\n')
	} catch (err) {
		console.error('! Problem Installing Dependencies !')
		throw err
	}
}

async function appBuilder() {
	await dirMaker()
	await fileMaker()
	copyAssets()
	installDeps()
}
appBuilder()
