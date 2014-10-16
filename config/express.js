/**
 * Node and 3rd party packages
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

  /**
   * Compression middleware
   * Place before express static middleware
   */
  app.use(compression({
    threshold: 512
  }));

  /**
   * Static directory middleware
   */
  app.use(serveStatic(config.root + '/public'));

  /**
   * Development environment specific settings & middleware
   */
  if (env === 'development') {
    // http logging
    app.use(morgan('dev'));

    // Swig templating engine settings
    swig.setDefaults({
      cache: false
    });
  }

  /**
   * Express view settings and engine
   */
  app.engine('html', swig.renderFile);
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'html');

  /**
   * Cookie parsing middleware
   * Place before sessions
   */
  app.use(cookieParser());

  /**
   * Body parsing middleware
   */

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  /**
   * Express session storage via mongo
   */
  app.use(session({
    secret: pkg.name,
    store: new mongoStore(config.mongoStore),
    resave: true,
    saveUninitialized: true
  }));
}
