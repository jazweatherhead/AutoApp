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

`$ git clone http://github.com/jasmyn/AutoAppJS.git .`


### Configure
Edit the config object at the top of aa.js.

---
| config key | description                                           |
|------------|-------------------------------------------------------|
| name       | The site/app name.                                    |
| dbNoun     | The thing you're using the db to store.               |
| dbDef      | The db field names, types and if they're required.    |
| yarn       | True installs dependencies with yarn. False uses npm. |
---
 Then replace the contents of `assets/` with your 
	`favicon.ico`
	`logo192.png`
	`logo512.png`
	
### Create

`$ npm install` or `$ yarn install`

*The next step can take several minutes as AutoApp installs both client and server dependencies. It's noticably faster with yarn. If using yarn,  set config.yarn to true to prevent lock file conflicts.*

`$ node aa`

### Commands

Make sure Mongo is running locally, then...

`$ npm run dev` (development)

`$ npm run debug` (debug)

`$ npm start` (production)

***All done! Your app is live on [localhost:3000](localhost:3000)***