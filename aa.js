const fs = require('fs')

/* Edit the config object with your project details */
const config = { // TODO db stuff
  name: 'BlackCat', /* (no spaces) */
	asset_dir: __dirname + '/assets/',
	dbNoun: 'movies', // thing you're storing in db
	dbDef: {
		title: {
			type: 'string',
			required: true
		},
		director: {
			type: 'string',
			required: true
		},
		year: {
			type: 'number',
			required: true
		}
	}
}

;(function makeNouns() {
	const lowerCase = config.dbNoun.toLowerCase()
	console.log(lowerCase)
	
	const upperCase = config.dbNoun.toUpperCase()
	console.log(upperCase)
	
	const titleCase = config.dbNoun[0].toUpperCase() + config.dbNoun.slice(1)
	console.log(titleCase)
})()

/* Setup spinner */
const Spinner = require('cli-spinner').Spinner
const spinner = new Spinner('processing.. %s')
spinner.setSpinnerString('|/-\\')
spinner.start()

/* For the copyright notice */
const now = new Date()
const year = now.getFullYear()

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
	'frontend/src/components/CreateMovie',
	'frontend/src/components/DeleteMovie',
	'frontend/src/components/Header',
	'frontend/src/components/ReadMovie',
	'frontend/src/components/ReadMovies',
	'frontend/src/components/UpdateMovie',
	'app/controllers',
	'app/routes',
	'app/views',
	'api/controllers',
	'api/models',
	'api/routes',
]

/* Makes the project directories */
;(function dirMaker(dirs) {
	how_many_dirs = dirs.length
	for (let x = 0; x < how_many_dirs; x++) {
		if (!fs.existsSync(`${dirs[x]}/`)) {
			fs.mkdirSync(`${dirs[x]}/`)
			console.log(`AA: built ${dirs[x]}/`);
		} else {
			console.log(`AA: skipping ${dirs[x]}/`);
		}
	}
})(dirs)

/* Files to be built - You can add your own entries to customize the generator */
files = [
	{ file: '.env',
  content: "#Change MONGODB_URI to your production db\nMONGODB_URI = mongodb://localhost/MOVIE_DB\nPORT = 9000"},
{ file: 'app.js',
  content: "const express = require(\'express\');\nconst path = require(\'path\');\nconst createError = require(\'http-errors\');\nconst cookieParser = require(\'cookie-parser\');\nconst logger = require(\'morgan\');\nconst sassMiddleware = require(\'node-sass-middleware\');\nconst favicon = require(\'serve-favicon\');\nrequire(\'dotenv\').config();\nrequire(\'./api/models/db\');\n\nconst routes = require(\'./app/routes/index\');\nconst routesApi = require(\'./api/routes/index\');\n\nconst app = express();\n\n// view engine setup\napp.set(\'views\', path.join(__dirname, \'app\', \'views\'));\napp.set(\'view engine\', \'pug\');\n\napp.use(favicon(__dirname + \'/public/favicon.ico\'));\napp.use(logger(\'dev\'));\napp.use(express.json());\napp.use(express.urlencoded({ extended: false }));\napp.use(cookieParser());\napp.use(sassMiddleware({\n  src: path.join(__dirname, \'public\'),\n  dest: path.join(__dirname, \'public\'),\n  indentedSyntax: false, // true = .sass and false = .scss\n  sourceMap: true\n}));\napp.use(express.static(path.join(__dirname, \'public\')));\n\napp.use(\'/\', routes);\napp.use(\'/api\', routesApi);\n\n// catch 404 and forward to error handler\napp.use(function(req, res, next) {\n  next(createError(404));\n});\n\n// error handler\napp.use(function(err, req, res, next) {\n  // set locals, only providing error in development\n  res.locals.message = err.message;\n  res.locals.error = req.app.get(\'env\') === \'development\' ? err : {};\n\n  // render the error page\n  res.status(err.status || 500);\n  res.render(\'error\');\n});\n\nmodule.exports = app;\n"},
{ file: 'package.json',
  content: "{\n  \"name\": \"aa2-mern\",\n  \"version\": \"1.0.0\",\n  \"private\": true,\n  \"main\": \"./bin/www\",\n\"scripts\": {\n    \"start\": \"set NODE_ENV=production; nodemon ./bin/www\",\n    \"dev\": \"set NODE_ENV=development; concurrently \\\"nodemon ./bin/www\\\" \\\"cd frontend && yarn start\\\"\",\n    \"debug\": \"set NODE_ENV=development; concurrently \\\"DEBUG=aa2-mern:* nodemon ./bin/www\\\" \\\"cd frontend && yarn start\\\"\"\n  },\n\"dependencies\": {\n    \"concurrently\": \"^5.3.0\",\n    \"cookie-parser\": \"^1.4.5\",\n    \"debug\": \"~2.6.9\",\n    \"dotenv\": \"^8.2.0\",\n    \"express\": \"~4.16.1\",\n    \"http-errors\": \"~1.6.3\",\n    \"mongodb\": \"^3.6.2\",\n    \"mongoose\": \"^5.10.9\",\n    \"morgan\": \"~1.9.1\",\n    \"node-sass-middleware\": \"0.11.0\", \n    \"nodemon\": \"^2.0.5\",\n    \"pug\": \"2.0.0-beta11\",\n    \"request\": \"^2.88.2\",\n    \"request-promise-native\": \"^1.0.9\",\n    \"serve-favicon\": \"^2.5.0\"\n  }\n}\n"},
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
  content: "import React from \'react\'\nimport {\n\tBrowserRouter as Router,\n\tSwitch,\n\tRoute\n} from \'react-router-dom\'\n\nimport Header from \'./components/Header/Header\'\nimport CreateMovie from \'./components/CreateMovie/CreateMovie\'\nimport ReadMovies from \'./components/ReadMovies/ReadMovies\'\nimport ReadMovie from \'./components/ReadMovie/ReadMovie\'\nimport DeleteMovie from \'./components/DeleteMovie/DeleteMovie\'\n\nimport \'normalize.css\'\nimport \'./App.css\'\n\nfunction App() {\n\t\treturn (\n\t\t\t<Router>\n\t\t\t\t<div className=\"App\">\n\t\t\t\t\t<Header />\n\t\t\t\t\t<main>\n\t\t\t\t\t\t<Switch>\n\t\t\t\t\t\t\t<Route exact path=\'/\' component={ReadMovies} />\n\t\t\t\t\t\t\t<Route path=\'/create\' component={CreateMovie} />\n\t\t\t\t\t\t\t<Route path=\'/delete\' component={DeleteMovie} />\n\t\t\t\t\t\t\t<Route path=\'/:movieid\' component={ReadMovie} />\n\t\t\t\t\t\t</Switch>\n\t\t\t\t\t</main>\n\t\t\t\t</div>\n\t\t\t</Router>\n\t\t)\n}\n\nexport default App\n"},
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
{ file: 'frontend/src/components/UpdateMovie/UpdateMovie.jsx',
  content: "import React, { useState } from \'react\'\nimport axios from \'axios\'\n\nconst UpdateMovie = (props) => {\n\tconst [msg, setMsg] = useState(\'\')\n\tconst [msgColor, setMsgColor] = useState(\'#0f0\')\n\t\n\tfunction updateMovie(movieid) {\n\t\taxios.put(`api/movies/${movieid}`,\n\t\t\t{\n\t\t\t\ttitle: props.movie.title,\n\t\t\t\tdirector: props.movie.director,\n\t\t\t\tyear: props.movie.year\n\t\t\t}\n\t\t)\n\t\t.then(res => {\n\t\t\tconsole.log(\'movie updated\')\n\t\t\t// show message\n\t\t\tsetMsg(\'Movie updated!\')\n\t\t\tsetMsgColor(\'#0ff\')\n\t\t})\n\t\t.catch(err => {\n\t\t\tconsole.error(err)\n\t\t\t// show message\n\t\t\tsetMsg(\'Problem updating movie!\')\n\t\t\tsetMsgColor(\'#f00\')\n\t\t})\n\t}\n\t\n\tfunction handleSubmit(e) {\n\t\te.preventDefault()\n\t\t// remove from db\n\t\tupdateMovie(props.movieid)\n\t\t// clear form\n\t\tdocument.getElementById(\'update-movie-form\').reset()\n\t}\n\t\n\treturn(\n\t\t<div>\n\t\t\t<div className=\"update-movie\"><br />\n\t\t\t\t<h3>Update Movie</h3>\n\t\t\t\t<p id=\"msg\" style={{fontWeight: \'bold\', color: msgColor}}>{msg}</p>\n\t\t\t\t<form onSubmit={handleSubmit} id=\"update-movie-form\">\n\t\t\t\t\t<label htmlFor=\"title\">Title:</label><br />\n\t\t\t\t\t<input type=\"text\" name=\"title\" id=\"title\" value={props.movie.title} onChange={props.useInputTitleChange} /><br />\n\t\t\t\t\t<label htmlFor=\"director\">Director:</label><br />\n\t\t\t\t\t<input type=\"text\" name=\"director\" id=\"director\" value={props.movie.director} onChange={props.useInputDirectorChange} /><br />\n\t\t\t\t\t<label htmlFor=\"year\">Year:</label><br />\n\t\t\t\t\t<input type=\"text\" name=\"year\" id=\"year\" value={props.movie.year} onChange={props.useInputYearChange} /><br />\n\t\t\t\t\t<input type=\"submit\" value=\"Update Movie\"/>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t</div>\n\t)\n}\n\nexport default UpdateMovie"},
{ file: 'frontend/src/components/UpdateMovie/UpdateMovie.scss',
  content: ".update-movie {\n\t\n}\n\n#update-movie-form {\n\t\n}"},
{ file: 'frontend/src/components/ReadMovies/ReadMovies.jsx',
  content: "import React, { useState, useEffect } from \'react\'\nimport axios from \'axios\'\n\nimport \'./ReadMovies.scss\'\n\nfunction ReadMovies() {\n\tconst [movies, setMovies] = useState([])\n\t\n\tuseEffect(() => {\n\t\tgetMovies()\n\t}, [])\n\t\n\tfunction getMovies () {\n\t\taxios.get(\'/api/movies\')\n\t\t\t.then(res => {\n\t\t\t\tif (res.data) {\n\t\t\t\t\tsetMovies(res.data)\n\t\t\t\t\tconsole.log(res.data)\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(err => console.error(err))\n\t}\n\t\n\treturn (\n\t\t<div className=\"read-movies\">\n\t\t\t{\n\t\t\t\tmovies.map(movie => (\n\t\t\t\t<p key={movie._id}>\n\t\t\t\t\t<a href={`/${movie._id}`}>{movie.title}</a>\n\t\t\t\t</p>\n\t\t\t\t))\n\t\t\t}\n\t\t</div>\n\t)\n}\n\nexport default ReadMovies"},
{ file: 'frontend/src/components/ReadMovies/ReadMovies.scss',
  content: ".read-movies {\n\t\n}"},
{ file: 'frontend/src/components/ReadMovie/ReadMovie.jsx',
  content: "import React, { useState, useEffect } from \'react\'\nimport axios from \'axios\'\nimport { useParams } from \'react-router-dom\'\n\nimport UpdateMovie from \'../UpdateMovie/UpdateMovie\'\n\nimport \'./ReadMovie.scss\'\n\nfunction ReadMovie() {\n\tconst [movie, setMovie] = useState(\n\t\t{\n\t\t\ttitle: \'\',\n\t\t\tdirector: \'\',\n\t\t\tyear: \'\'\n\t\t}\n\t)\n\tconst [isUpdateHidden, setIsUpdateHidden] = useState(true)\t\n\t\n\tlet { movieid } = useParams()\n\t\n\t// get movie details\n\tuseEffect(() => {\n\t\taxios.get(`/api/movies/${movieid}`)\n\t\t\t.then(res => {\n\t\t\t\tsetMovie(res.data)\n\t\t\t\tconsole.log(res.data)\n\t\t\t})\n\t\t\t.catch(err => console.error(err))\n\t}, [])\n\t\n\tfunction handleEditButton(e) {\n\t\te.preventDefault()\n\t\tsetIsUpdateHidden(!isUpdateHidden)\n\t}\n\n  function handleInputChange(e) {\n    let editBlock\n    switch (e.target.name) {\n      case \'title\':\n        editBlock = {\n\t\t\t\t\ttitle: e.target.value,\n\t\t\t\t\tdirector: movie.director,\n\t\t\t\t\tyear: movie.year\n        }\n        break\n      case \'director\':\n        editBlock = {\n\t\t\t\t\ttitle: movie.title,\n\t\t\t\t\tdirector: e.target.value,\n\t\t\t\t\tyear: movie.year\n        }\n        break\n      case \'year\':\n        editBlock = {\n\t\t\t\t\ttitle: movie.title,\n\t\t\t\t\tdirector: movie.director,\n\t\t\t\t\tyear: e.target.value\n        }\n        break\n\n      default:\n        console.log(\'The form is confused...\')\n        break\n    }\n\n    setMovie(editBlock)\n  }\n\t\n\treturn (\n\t\t<div>\n\t\t\t<div className=\"read-movie\">\n\t\t\t\t<h2>{movie.title}</h2>\n\t\t\t\tDirector: {movie.director}<br />\n\t\t\t\tYear: {movie.year}<br /><br />\n\t\t\t\t<form>\n\t\t\t\t\t<input type=\"submit\" value={isUpdateHidden ? \"Edit Movie\": \"Nevermind\"} onClick={handleEditButton}/>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t\t{ !isUpdateHidden && <UpdateMovie \n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmovie={movie}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tmovieid={movieid}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\thandleInputChange={handleInputChange} /> }\n\t\t</div>\n\t)\n}\n\nexport default ReadMovie"},
{ file: 'frontend/src/components/ReadMovie/ReadMovie.scss',
  content: ".read-movie {\n\t\n}"},
{ file: 'frontend/src/components/Header/Header.jsx',
  content: "import React from \'react\'\nimport { Link } from \'react-router-dom\'\n\nimport \'./Header.scss\'\n\nfunction Header() {\n\treturn (\n\t\t<div className=\"header\">\n\t\t\t<nav>\n\t\t\t\t<Link className=\'option\' to=\'/create\'>\n\t\t\t\t\tCreate\n\t\t\t\t</Link>\n\t\t\t\t<Link className=\'option\' to=\'/delete\'>\n\t\t\t\t\tDelete\n\t\t\t\t</Link>  \n\t\t\t</nav>\n\t\t\t<h1>\n\t\t\t\t<Link className=\'option\' to=\'/\'>\n\t\t\t\t\tMovie DB\n\t\t\t\t</Link>\n\t\t\t</h1>\n\t\t</div>\n\t)\n}\n\nexport default Header"},
{ file: 'frontend/src/components/Header/Header.scss',
  content: ".header {\n}\n\n.option {\n\tpadding-right: 10px;\n}"},
{ file: 'frontend/src/components/DeleteMovie/DeleteMovie.jsx',
  content: "import React, { useState, useEffect } from \'react\'\nimport axios from \'axios\'\n\nimport useSelect from \'../../hooks/useSelect\'\n\t\nimport \'./DeleteMovie.scss\'\n\nfunction DeleteMovie() {\n\tconst [id, setId] = useSelect(null)\n\tconst [movies, setMovies] = useState([])\n\tconst [msg, setMsg] = useState(\'\')\n\tconst [msgColor, setMsgColor] = useState(\'#0f0\')\n\t\n\tuseEffect(() => {\n\t\tgetMovies()\n\t}, [])\n\t\n\tfunction getMovies() {\n\t\taxios.get(\'/api/movies\')\n\t\t\t.then(res => {\n\t\t\t\tif (res.data) {\n\t\t\t\t\tsetMovies(res.data)\n\t\t\t\t\tconsole.log(res.data)\n\t\t\t\t}\n\t\t\t})\n\t\t\t.catch(err => console.error(err))\n\t}\n\t\n\tfunction handleSubmit(e) {\n\t\te.preventDefault()\n\t\t// remove from db\n\t\tdelMovie(id)\n\t\t// get movie list again\n\t\tgetMovies()\n\t}\n\t\n\tfunction delMovie(id) {\n\t\taxios.delete(`api/movies/${id}`)\n\t\t.then(res => {\n\t\t\t\tconsole.log(\'movie removed from db\')\n\t\t\t\t// show message\n\t\t\t\tsetMsg(\'Movie removed from database!\')\n\t\t\t\tsetMsgColor(\'#0ff\')\n\t\t})\n\t\t.catch(err => {\n\t\t\tconsole.error(err)\n\t\t\t// show message\n\t\t\tsetMsg(\'Problem removing Movie from database!\')\n\t\t\tsetMsgColor(\'#f00\')\n\t\t})\n\t}\n\t\n\treturn (\n\t\t<div className=\"delete-movie\">\n\t\t<h2>Delete Movie</h2>\n\t\t<p id=\"msg\" style={{fontWeight: \'bold\', color: msgColor}}>{msg}</p>\n\t\t<form onSubmit={handleSubmit} id=\"delete-movie-form\">\n\t\t\t<label htmlFor=\"title\">Title:</label><br /><br />\n\t\t\t<select id=\"movie\" name=\"movie\" onChange={setId}>\n\t\t\t{\n\t\t\t\tmovies.map(movie => (\n\t\t\t\t\t<option key={movie._id} value={movie._id}>{movie.title}</option>\n\t\t\t\t))\n\t\t\t}\n\t\t\t</select>\n\t\t\t<br />\n\t\t\t<input type=\"submit\" value=\"Remove Movie from DB\"/>\n\t\t</form>\n\t\t</div>\n\t)\n}\n\nexport default DeleteMovie"},
{ file: 'frontend/src/components/DeleteMovie/DeleteMovie.scss',
  content: ".delete-movie {\n\t\n}"},
{ file: 'frontend/src/components/CreateMovie/CreateMovie.jsx',
  content: "import React, { useState } from \'react\'\nimport axios from \'axios\'\n\nimport useInput from \'../../hooks/useInput\'\nimport \'./CreateMovie.scss\'\n\nfunction CreateMovie() {\n\tconst [title, setTitle] = useInput(null)\n\tconst [director, setDirector] = useInput(null)\n\tconst [year, setYear] = useInput(null)\n\tconst [msg, setMsg] = useState(\'\')\n\tconst [msgColor, setMsgColor] = useState(\'#0f0\')\n\t\n\tfunction handleSubmit(e) {\n\t\te.preventDefault()\n\t\t// add to db\n\t\tpostMovie(\n\t\t\ttitle,\n\t\t\tdirector,\n\t\t\tyear\n\t\t)\n\t\t// clear form\n\t\tdocument.getElementById(\'create-movie-form\').reset()\n\t}\n\t\n\t// TODO test this\n\tfunction postMovie(title, director, year) {\n\t\taxios.post(\'api/movies\', {\n\t\t\ttitle: title,\n\t\t\tdirector: director,\n\t\t\tyear: year\n\t\t})\n\t\t.then(res => {\n\t\t\tif (res.data) {\n\t\t\t\tconsole.log(res.data)\n\t\t\t\tconsole.log(\'movie added to db\')\n\t\t\t\t// show message\n\t\t\t\tsetMsg(\'Movie added to database!\')\n\t\t\t\tsetMsgColor(\'#0ff\')\n\t\t\t}\n\t\t})\n\t\t.catch(err => {\n\t\t\tconsole.error(err)\n\t\t\t// show message\n\t\t\tsetMsg(\'Problem adding movie to database!\')\n\t\t\tsetMsgColor(\'#f00\')\n\t\t})\n\t}\n\t\n\treturn (\n\t\t<div className=\"create-movie\">\n\t\t<h2>Create Movie</h2>\n\t\t<p id=\"msg\" style={{fontWeight: \'bold\', color: msgColor}}>{msg}</p>\n\t\t<form onSubmit={handleSubmit} id=\"create-movie-form\">\n\t\t\t<label htmlFor=\"title\">Title:</label><br />\n\t\t\t<input type=\"text\" name=\"title\" onChange={setTitle} required />\n\t\t\t<br />\n\t\t\t<label htmlFor=\"director\">Director:</label><br />\n\t\t\t<input type=\"text\" name=\"director\" onChange={setDirector} required />\n\t\t\t<br />\n\t\t\t<label htmlFor=\"year\">Year:</label><br />\n\t\t\t<input type=\"text\" name=\"year\" onChange={setYear} required />\n\t\t\t<br />\n\t\t\t<input type=\"submit\" value=\"Add Movie to DB\"/>\n\t\t</form>\n\t\t</div>\n\t)\n}\n\nexport default CreateMovie"},
{ file: 'frontend/src/components/CreateMovie/CreateMovie.scss',
  content: ".create-movie {\n\t\n}"},
{ file: 'frontend/public/index.html',
  content: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <link rel=\"icon\" href=\"%PUBLIC_URL%/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <meta name=\"theme-color\" content=\"#000000\" />\n    <meta\n      name=\"description\"\n      content=\"Web site created using create-react-app\"\n    />\n    <link rel=\"apple-touch-icon\" href=\"%PUBLIC_URL%/logo192.png\" />\n    <!--\n      manifest.json provides metadata used when your web app is installed on a\n      user\'s mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/\n    -->\n    <link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\" />\n    <!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n\n      Unlike \"/favicon.ico\" or \"favicon.ico\", \"%PUBLIC_URL%/favicon.ico\" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n    <title>aa2 MERN</title>\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id=\"root\"></div>\n    <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  </body>\n</html>\n"},
{ file: 'frontend/public/manifest.json',
  content: "{\n  \"short_name\": \"React App\",\n  \"name\": \"Create React App Sample\",\n  \"icons\": [\n    {\n      \"src\": \"favicon.ico\",\n      \"sizes\": \"64x64 32x32 24x24 16x16\",\n      \"type\": \"image/x-icon\"\n    },\n    {\n      \"src\": \"logo192.png\",\n      \"type\": \"image/png\",\n      \"sizes\": \"192x192\"\n    },\n    {\n      \"src\": \"logo512.png\",\n      \"type\": \"image/png\",\n      \"sizes\": \"512x512\"\n    }\n  ],\n  \"start_url\": \".\",\n  \"display\": \"standalone\",\n  \"theme_color\": \"#000000\",\n  \"background_color\": \"#ffffff\"\n}\n"},
{ file: 'frontend/public/robots.txt',
  content: "# https://www.robotstxt.org/robotstxt.html\nUser-agent: *\nDisallow:\n"},
{ file: 'bin/www',
  content: "#!/usr/bin/env node\n\n/**\n * Module dependencies.\n */\n\nconst app = require(\'../app\');\nconst debug = require(\'debug\')(\'aa2-mern:server\');\nconst http = require(\'http\');\n\n/**\n * Get port from environment and store in Express.\n */\n\nconst port = normalizePort(process.env.PORT || \'9000\'); // changed from 3000\napp.set(\'port\', port);\n\n/**\n * Create HTTP server.\n */\n\nconst server = http.createServer(app);\n\n/**\n * Listen on provided port, on all network interfaces.\n */\n\nserver.listen(port);\nserver.on(\'error\', onError);\nserver.on(\'listening\', onListening);\n\n/**\n * Normalize a port into a number, string, or false.\n */\n\nfunction normalizePort(val) {\n  const port = parseInt(val, 10);\n\n  if (isNaN(port)) {\n    // named pipe\n    return val;\n  }\n\n  if (port >= 0) {\n    // port number\n    return port;\n  }\n\n  return false;\n}\n\n/**\n * Event listener for HTTP server \"error\" event.\n */\n\nfunction onError(error) {\n  if (error.syscall !== \'listen\') {\n    throw error;\n  }\n\n  const bind = typeof port === \'string\'\n    ? \'Pipe \' + port\n    // : \'Port \' + port;\n    : port;\n\n  // handle specific listen errors with friendly messages\n  switch (error.code) {\n    case \'EACCES\':\n      console.error(bind + \' requires elevated privileges\');\n      process.exit(1);\n      break;\n    case \'EADDRINUSE\':\n      console.error(bind + \' is already in use\');\n      process.exit(1);\n      break;\n    default:\n      throw error;\n  }\n}\n\n/**\n * Event listener for HTTP server \"listening\" event.\n */\n\nfunction onListening() {\n  const addr = server.address();\n  const bind = typeof addr === \'string\'\n    ? \'pipe \' + addr\n    // : \'port \' + addr.port;\n    : addr.port;\n  // debug(\'Listening on \' + bind);\n  debug(\'Listening on http://localhost:\' + bind);\n}\n"},
{ file: 'app/views/detail.pug',
  content: "extends layout\n\nblock content\n\th1\n\t\ta(href=`/`) #{title}\n\th2 #{movie.title}\n\tp Year: #{movie.year}\n\tp Director: #{movie.director}"},
{ file: 'app/views/error.pug',
  content: "extends layout\n\nblock content\n\th1= message\n\th2= detail\n\th2= error.status\n\tpre #{error.stack}\n"},
{ file: 'app/views/index.pug',
  content: "extends layout\n\nblock content\n\th1= title\n\teach val in movies\n\t\tp\n\t\t\ta(href=`/${val._id}`) #{val.title}"},
{ file: 'app/views/layout.pug',
  content: "doctype html\nhtml\n  head\n    title= title\n    link(rel=\'stylesheet\', href=\'/stylesheets/style.css\')\n  body\n    block content\n"},
{ file: 'app/routes/index.js',
  content: "const express = require(\'express\');\nconst router = express.Router();\nconst ctrlHome = require(\'../controllers/home\');\nconst ctrlDetail = require(\'../controllers/detail\');\n\n/* Home */\nrouter.get(\'/\', ctrlHome.home);\n\n/* Detail */\nrouter.get(\'/:movieid\', ctrlDetail.detail);\n\nmodule.exports = router;"},
{ file: 'app/controllers/detail.js',
  content: "const rp = require(\'request-promise-native\');\n\nconst server = `http://localhost:${process.env.PORT}`;\n\nmodule.exports.detail = async (req, res) => {\n\ttry {\n\t\tlet movie = JSON.parse(await rp.get(`${server}/api/movies/${req.params.movieid}`));\n\t\tconsole.log(`movie: ${movie}`)\n\t\tres.render(\n\t\t\t\'detail\', \n\t\t\t{\n\t\t\t\ttitle: \'Movie DB\',\n\t\t\t\tmovie: movie\n\t\t\t},\n\t\t);\n\t} catch (err) {\n\t\tres.render(\n\t\t\t\'error\',\n\t\t\t{\n\t\t\t\tmessage: \"Server Error\",\n\t\t\t\tdetail: \"Probably a bad movieid\",\n\t\t\t\terror: err\n\t\t\t}\n\t\t);\n\t}\n}"},
{ file: 'app/controllers/home.js',
  content: "const rp = require(\'request-promise-native\');\n\nconst server = `http://localhost:${process.env.PORT}`;\n\nmodule.exports.home = async (req, res) => {\n\tlet movies = JSON.parse(await rp.get(`${server}/api/movies`));\n\n\tres.render(\n\t\t\'index\', \n\t\t{\n\t\t\ttitle: \'Movie DB\',\n\t\t\tmovies: movies\n\t\t},\n\t);\n}\n"},
{ file: 'api/routes/index.js',
  content: "var express = require(\'express\');\nvar router = express.Router();\nvar ctrlMovies = require(\'../controllers/movies\');\n\n/* Movies */\nrouter.get(\'/movies\', ctrlMovies.moviesList); // list all\nrouter.post(\'/movies\', ctrlMovies.moviesCreate); // C\nrouter.get(\'/movies/:movieid\', ctrlMovies.moviesReadOne); // R\nrouter.put(\'/movies/:movieid\', ctrlMovies.moviesUpdateOne); // U\nrouter.delete(\'/movies/:movieid\', ctrlMovies.moviesDeleteOne); // D\n\nmodule.exports = router;"},
{ file: 'api/models/db.js',
  content: "const mongoose = require(\'mongoose\');\n\n/*Set URI*/\nconst dbName = \'MOVIE_DB\';\nlet dbUri = `mongodb://localhost/${dbName}`;\n\nif (process.env.NODE_ENV === \'production\') {\n  console.log(\'You are running in production!\');\n  dbUri = process.env.MONGODB_URI;\n}\nif (process.env.NODE_ENV === \'development\') {\n  console.log(\'You are running in development!\');\n}\n\n/*DB Connect*/\nmongoose.connect(\n\tdbUri, \n\t{\n\t\tuseNewUrlParser: true,\n\t\tuseFindAndModify: false,\n\t\tuseUnifiedTopology: true\n\t}\n);\n\n/*Event Logs*/\nmongoose.connection.on(\'connected\', function () {\n  console.log(\'Mongoose connected to \' + dbUri);\n});\nmongoose.connection.on(\'error\', function (err) {\n  console.log(\'Mongoose connection error: \' + err);\n});\nmongoose.connection.on(\'disconnected\', function () {\n  console.log(\'Mongoose disconnected\');\n});\n\nconst gracefulShutdown = function (msg, callback) {\n  mongoose.connection.close(function () {\n    console.log(\'Mongoose disconnected through \' + msg);\n    callback();\n  });\n};\n\n/*Use gracefulShutdown()*/\nprocess.once(\'SIGUSR2\', function () {\n  gracefulShutdown(\'nodemon\', function () {\n    process.kill(process.pid, \'SIGUSR2\');\n  });\n});\nprocess.on(\'SIGINT\', function () {\n  gracefulShutdown(\'app termination\', function () {\n    process.exit(0);\n  });\n});\nprocess.on(\'SIGTERM\', function () { // TODO necessary?\n  gracefulShutdown(\'Heroku app shutdown\', function () {\n    process.exit(0);\n  });\n});\n\nrequire(\'./movies\');"},
{ file: 'api/models/movies.js',
  content: "const mongoose = require(\'mongoose\');\n\nconst movieSchema = new mongoose.Schema({\n  title: { type: String, required: true },\n  year: { type:Number, required: true },\n  director: { type:String, required: true }\n});\n\nmongoose.model(\'Movie\', movieSchema); // the first param determines the collection name"},
{ file: 'api/controllers/movies.js',
  content: "const mongoose = require(\'mongoose\');\nmongoose.set(\'returnOriginal\', false);\nconst Movie = mongoose.model(\'Movie\');\n\nconst sendJSONresponse = function(res, status, content) {\n  res.status(status);\n  res.json(content);\n};\n\n/* GET /api/movies/ */\nmodule.exports.moviesList = async (req, res) => {\n\ttry {\n\t\tconst movies = await Movie.find({}); // find all documents\n\t\tconsole.log(movies);\n\t\tsendJSONresponse(res, 200, movies);\n\t} catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 400, err);\n\t}\n};\n\n/* POST /api/movies/ (Create) */\nmodule.exports.moviesCreate = async (req, res) => {\t\n\tconst movie = new Movie(req.body);\n\ttry {\n\t\tawait movie.save();\n\t\tsendJSONresponse(res, 201, movie);\n\t} catch (err) {\n\t\tconsole.log(err.message)\n\t\tsendJSONresponse(res, 500, err);\n\t}\n};\n\n/* GET /api/movies/:movieid (Read) */\nmodule.exports.moviesReadOne = async (req, res) => {\n\ttry {\n\t\tconst movie = await Movie.findById(req.params.movieid);\n\t\tif (!movie) {\n\t\t\tsendJSONresponse(res, 404);\n\t\t\treturn;\n\t\t}\n\t\tconsole.log(movie);\n\t\tsendJSONresponse(res, 200, movie);\n\t} catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 500, err);\n\t}\n};\n\n/* PUT /api/movies/:movieid (Update) */\nmodule.exports.moviesUpdateOne = async(req, res) => {\n\tconst movieid = req.params.movieid;\n\tconsole.log(\'movieid: \', movieid)\n\ttry {\n\t\tawait Movie.findByIdAndUpdate(movieid, req.body);\n\t\tsendJSONresponse(res, 200, req.query);\n\t} catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 500, err);\n\t}\n}\n\n/* DELETE /api/movies/:movieid (Delete) */\nmodule.exports.moviesDeleteOne = async (req, res) => {\n  try {\n\t\tconst movieid = req.params.movieid;\n    const movie = await Movie.findByIdAndDelete(movieid);\n    if (!movie) {\n\t\t\tsendJSONresponse(res, 404);\n\t\t\treturn;\n\t\t}\n\t\tconsole.log(\"movie id \" + movieid + \" deleted\");\n    sendJSONresponse(res, 204, null);\n  } catch (err) {\n\t\tconsole.log(err.message);\n\t\tsendJSONresponse(res, 500, err);\n  }\n};"}
]

/* Makes the project files */
;(function fileMaker(files) {
	how_many_files = files.length
	for (let x = 0; x < how_many_files; x++) {
		fs.writeFile(
			`${files[x].file}`, 
			`${files[x].content}`, 
			function(err) {
				if (err) {
					console.log(`AA: error building ${files[x].file}`)
					return console.log(err)
				} else {
					console.log(`AA: built ${files[x].file}`)
				}
		})
	}
})(files)

/* Copies the banner and favicon from assets/ to their final destination */
// ;(function copyAssets() {
//   /* favicon.ico */
//   var source_favicon = fs.createReadStream(config.asset_dir + 'favicon.ico')
//   var favicon = fs.createWriteStream('./public/favicon.ico')
//   source_favicon.pipe(favicon)

//   /* banner.png (any size) */
//   var source_banner = fs.createReadStream(config.asset_dir + 'banner.png')
//   var banner = fs.createWriteStream('./public/img/banner.png')
//   source_banner.pipe(banner)
// })()

/* Installs the project dependencies */
;(function installDeps (spinner) {
  var exec = require('child_process').exec, child
  child = exec('npm i',
    function (err, stdout, stderr) { // the callback
      console.log(`AA: built dependencies... ${stdout}`)
      console.log(`AA: dependencies... ${stderr}`)
      spinner.stop()
      if (err !== null) {
        console.log('exec error: ${err}')
      }
    }
  )
})(spinner)