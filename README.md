# AutoApp

AutoApp is a MERN app scaffolding generator.

## Huh?
It makes new MERN apps.

## Neat!
Right? Just feed it some assets and watch it go...

## Features

- Complete [MERN](https://www.mongodb.com/mern-stack) setup
- [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) back-end
	- Server on [:9000](http://localhost:9000)
	- Client on [:3000](http://localhost:3000)
- [Mongoose](http://mongoosejs.com/)
- [React Router](https://reactrouter.com/)

## Make it so!

### Clone
Clone the repo into your empty project directory. Don't forget the trailing dot!

`$ git clone http://github.com/jasmyn/AutoApp.git .`


### Configure
Edit the config object at the top of aa.js.	

| config key     | description                                               |
|----------------|-----------------------------------------------------------|
| name           | The site/app name.                                        |
| yarn           | True installs dependencies with yarn. False uses npm.     |
| dbNounSingular | The thing you're using the db to store.                   |
| dbNounPlural   | The plural of the thing you're using the db to store.     |
| dbSchema       | The db field names, types and if they're required.        |
| title          | Set this to the schema field you wish to use as the title |

 Then replace the contents of `assets/` with your 
	`favicon.ico`
	`logo192.png`
	`logo512.png`
	
*The config.title field will be used as the records' title, meaning it will appear in the GET performed at `noun/` and in the Create and Delete select boxes. This is only used for the front-end and doesn't affect the API.*
	
### Create

`$ npm install` or `$ yarn install`

*The next step can take several minutes as AutoApp installs both client and server dependencies. It's noticably faster with yarn. If using yarn,  set config.yarn to true to prevent lock file conflicts.*

`$ node aa`

### Commands

Make sure Mongo is running locally, then...

`$ npm run dev` (development)

`$ npm run debug` (debug)

`$ npm start` (production)

**Your app is live on [localhost:3000](localhost:3000)**

---

## REST API

The app is backed by a REST API, served by default at [localhost:9000](http://localhost:9000).

- `GET /noun` gets all db records
- `GET /noun/id` gets details of db record with that id
- `POST /noun` creates a new record
- `PUT /noun/id` updates the record with that id
- `DELETE /noun/id` deletes that record

*(noun is config.dbNounSingular)*

***Have fun!***