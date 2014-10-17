/*
 |--------------------------------------------------------------------------
 | Globals to be used throughout the app
 |--------------------------------------------------------------------------
 |
 | These two specifically help with require statements
 |
 */
global.__base = __dirname + '/';
global.__app = __filename;


/*
 |--------------------------------------------------------------------------
 | Node and 3rd party packages
 |--------------------------------------------------------------------------
 */
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var log4js = require('log4js');


/*
 |--------------------------------------------------------------------------
 | Port and Environment
 |--------------------------------------------------------------------------
 */
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;


/*
 |--------------------------------------------------------------------------
 | Include Config Base on Environment
 |--------------------------------------------------------------------------
 */
var config = require('./config')[env];


/*
 |--------------------------------------------------------------------------
 | Load Logger
 |--------------------------------------------------------------------------
 */
log4js.configure('./config/log4js.json')
var log = log4js.getLogger('app');


/*
 |--------------------------------------------------------------------------
 | Get the Express object
 |--------------------------------------------------------------------------
 */
var app = module.exports = express();


/*
 |--------------------------------------------------------------------------
 | Connect to MongoDb
 |--------------------------------------------------------------------------
 */
var mongoConnect = function() {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      },
      auto_reconnect: true
    }
  };

  mongoose.connect(config.mongooseDb, options, function(err) {
    if(err) {
      console.error('MongoDB connection failed - retrying in 2 seconds...', err);
      setTimeout(mongoConnect, 2000);
    }
    else {
      console.log('Successfully connected to MongoDb');
    }
  });

  if(app.get('env') === 'development') {
    if(config.mongooseDebug) {
      mongoose.set('debug', true);
    }
  }
};
mongoConnect();


/*
 |--------------------------------------------------------------------------
 | Load Mongoose Models
 |--------------------------------------------------------------------------
 */
fs.readdirSync('./app/models').forEach(function(file) {
  if(~file.indexOf('.js')) {
    require('./app/models/' + file);
  }
});


/*
 |--------------------------------------------------------------------------
 | Attach Express Middleware
 |--------------------------------------------------------------------------
 */
require('./config/express')(app, config);


/*
 |--------------------------------------------------------------------------
 | Load Express Routes
 |--------------------------------------------------------------------------
 */
fs.readdirSync('./app/routes').forEach(function(file) {
  if(~file.indexOf('.js')) {
    require('./app/routes/' + file)(app, config);
  }
});


/*
 |--------------------------------------------------------------------------
 | Error Handling
 |--------------------------------------------------------------------------
 */
app.use(function(error, req, res, next) {
  var status = error.status || 500;

  if(status === 500) {
    log.error(error.message + '\n' + status + '\n' + error.stack);
    res.status(status);

    if(app.get('env') === 'development') {
      res.render('errors/500', {
        message: error.message,
        error: error
      });
    }
    else {
      res.render('errors/500', {
        message: error.message,
        error: {}
      });
    }
  }
  else {
    res.status(404);
    res.render('errors/404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  }
});


/*
 |--------------------------------------------------------------------------
 | Spin Up the App
 |--------------------------------------------------------------------------
 */
app.listen(port);
console.log('Successfully started web server on port ' + port + '.');
