/**
 * Globals to be used throughout the app
 * These two specifically help with require statements
 */
global.__base = __dirname + '/';
global.__app = __filename;

/**
 * Node and 3rd party packages
 */
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');

/**
 * Port and Environment based on process (with fallbacks)
 */
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

/**
 * Include our config based on environment
 */
var config = require('./config')[env];

/**
 * Our express factory
 */
var app = module.exports = express();

/**
 * Bootstrap models
 */
fs.readdirSync('./app/models').forEach(function(file) {
  if (~file.indexOf('.js')) {
    require('./app/models/' + file);
  }
});

/**
 * Bootstrap express middleware
 */
require('./config/express')(app, config);

/**
 * Bootstrap routes
 */
fs.readdirSync('./app/routes').forEach(function(file) {
  if (~file.indexOf('.js')) {
    require('./app/routes/' + file)(app, config);
  }
});

app.listen(port);
console.log('Successfully started web server on port ' + port + '.');
