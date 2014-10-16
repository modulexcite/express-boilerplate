/*
 |--------------------------------------------------------------------------
 | Module dependencies
 |--------------------------------------------------------------------------
 */
var express = require('express');
var session = require('express-session');
var morgan = require('morgan');
var compression = require('compression');
var serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var mongoStore = require('connect-mongostore')(session);

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
  if (env === 'development') {
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
   | Request Body Parsing Middleware
   |--------------------------------------------------------------------------
   */
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  
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
}
