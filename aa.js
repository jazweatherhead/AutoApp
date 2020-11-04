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

/* Setup spinner */
const Spinner = require('cli-spinner').Spinner
const spinner = new Spinner('processing.. %s')
spinner.setSpinnerString('|/-\\')
spinner.start()

/* For the copyright notice */
const now = new Date()
const year = now.getFullYear()

/* Directories to be built. */ // TODO this
const dirs = []

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
files = [] // TODO this

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
;(function copyAssets() {
  /* favicon.ico */
  var source_favicon = fs.createReadStream(config.asset_dir + 'favicon.ico')
  var favicon = fs.createWriteStream('./public/favicon.ico')
  source_favicon.pipe(favicon)

  /* banner.png (any size) */
  var source_banner = fs.createReadStream(config.asset_dir + 'banner.png')
  var banner = fs.createWriteStream('./public/img/banner.png')
  source_banner.pipe(banner)
})()

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