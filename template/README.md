# aa2-mern

aa2 MERN template

## Features

- Complete MERN setup (server on :9000, client on :3000)
- `':9000/'` GET all documents
- `':9000/_id'` detail page
- CRUD 
- Express
- Mongodb
- Mongoose
- React Router
- Pug
- Sass
- Nodemon
- normalize.css

## Usage

Make sure Mongo is running locally, then...

`$ npm run dev` (development)

`$ npm run debug` (debug)

`$ npm start` (production)

## Server Setup

`mongo`
- Setup db auth. 
	See https://docs.mongodb.com/guides/server/auth/.

`.env`
- Set MONGODB_URI to your production DB.
- Set PORT to the port for your API 
	- 9000 to not have to change the proxy
	- Ensure it matches the one set on bin/www:15

`api/models/`
- Create your model.

`api/models/db.js`
- Set dbName
- Require your actual model at the bottom instead of 'movies'.

`api/controllers/`
- Create your controller.

`api/routes/`
- Setup your controller.

`public/`
- Change the favicon.

## Client Setup

`public/index.html`
- set title

`public/`
- set favicon