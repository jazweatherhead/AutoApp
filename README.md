# AutoApp

AutoApp is a MERN app scaffolding generator.

## Huh?
It makes new MERN apps.

## Neat!
Right? Just feed it some assets and watch it go...

## Features

- Complete MERN setup
- Demo CRUD app
	- Server on [:9000](localhost:9000)
	- Client on [:3000](localhost:3000)
- [Mongoose](http://mongoosejs.com/)
- [React Router](http://https://reactrouter.com/)

## Make it so!

1. **Clone** the repo into your empty project directory. Don't forget the trailing dot!
```
$ git clone http://github.com/jasmyn/AutoAppJS.git .
```

2. **Configure** the config object at the top of aa.js with the app name and the asset directory and replace the contents of assets/ with your 
	- favicon.ico
	- logo192.png
	- logo512.png
	

3. **Create** your app. This can take several minutes while it installs the dependencies. 

```
$ node aa
```
## Usage

Make sure Mongo is running locally, then...

`$ npm run dev` (development)

`$ npm run debug` (debug)

`$ npm start` (production)

**All done! Your app is live on [localhost:3000](localhost:3000)**