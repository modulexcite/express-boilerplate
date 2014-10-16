/*
 |--------------------------------------------------------------------------
 | Node and 3rd Party Packages
 |--------------------------------------------------------------------------
 */
var express = require('express'),
  session = require('express-session'),
  morgan = require('morgan'),
  compression = require('compression'),
  serveStatic = require('serve-static'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  swig = require('swig'),
  mongoStore = require('connect-mongostore')(session);

var pkg = require('../package.json');

module.exports = function(app, config) {
  var env = app.get('env');


  /*
   |--------------------------------------------------------------------------
   | View Settings
   |--------------------------------------------------------------------------
   */
  app.engine('html', swig.renderFile);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'html');


  /*
   |--------------------------------------------------------------------------
   | Compression Middleware
   |--------------------------------------------------------------------------
   |
   | Needs to be added before the static file middleware
   |
   */
  app.use(compression({
    threshold: 512
  }));


  /*
   |--------------------------------------------------------------------------
   | Static File Middleware
   |--------------------------------------------------------------------------
   */
  app.use(serveStatic(config.root + '/public'));


  /*
   |--------------------------------------------------------------------------
   | Development Specific Configurations
   |--------------------------------------------------------------------------
   */
  if(env === 'development') {
    // http logging
    app.use(morgan('dev'));

    // Swig templating engine settings
    swig.setDefaults({
      cache: false
    });
  }


  /*
   |--------------------------------------------------------------------------
   | Cookie Middleware
   |--------------------------------------------------------------------------
   |
   | Needs to be added before the session middleware
   |
   */
  app.use(cookieParser());


  /*
   |--------------------------------------------------------------------------
   | Session Storage using MongoDb
   |--------------------------------------------------------------------------
   */
  app.use(session({
    secret: pkg.name,
    store: new mongoStore(config.mongoStore),
    resave: true,
    saveUninitialized: true
  }));


  /*
   |--------------------------------------------------------------------------
   | Request Body Parsing Middleware
   |--------------------------------------------------------------------------
   */
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

}
