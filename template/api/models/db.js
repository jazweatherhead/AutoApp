const mongoose = require('mongoose');

/*Set URI*/
const dbName = 'MOVIE_DB';
let dbUri = `mongodb://localhost/${dbName}`;

if (process.env.NODE_ENV === 'production') {
  console.log('You are running in production!');
  dbUri = process.env.MONGODB_URI;
}
if (process.env.NODE_ENV === 'development') {
  console.log('You are running in development!');
}

/*DB Connect*/
mongoose.connect(
	dbUri, 
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	}
);

/*Event Logs*/
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbUri);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

/*Use gracefulShutdown()*/
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
process.on('SIGTERM', function () { // TODO necessary?
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

require('./movies');