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
 | Module depencies
 |--------------------------------------------------------------------------
 */
var fs = require('fs');
var app = module.exports = require('express')();
var mongoose = require('mongoose');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var log4js = require('log4js');


/*
 |--------------------------------------------------------------------------
 | Port and environment
 |--------------------------------------------------------------------------
 */
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;


/*
 |--------------------------------------------------------------------------
 | Get config based on current environment
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
 | Connect to MongoDB
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
    if (err) {
      console.error('MongoDB connection failed - retrying in 2 seconds...', err);
      setTimeout(mongoConnect, 2000);
    }

    console.log('Connected to MongoDB successfully.');
  });

  if (app.get('env') === 'development') {
    if (config.mongooseDebug) {
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
 | Bootstrap express
 |--------------------------------------------------------------------------
 */
require('./config/express')(app, config);


/*
 |--------------------------------------------------------------------------
 | Bootstrap application routes
 |--------------------------------------------------------------------------
 */
fs.readdirSync('./app/routes').forEach(function(file) {
  if (~file.indexOf('.js')) {
    require('./app/routes/' + file)(app, io);
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
 | Spin up the application
 |--------------------------------------------------------------------------
 */
http.listen(port);
console.log('Successfully started web server on port ' + port + '.');
