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
var fs = require('fs'),
  express = require('express'),
  mongoose = require('mongoose');


/*
 |--------------------------------------------------------------------------
 | Port and Environment
 |--------------------------------------------------------------------------
 */
var env = process.env.NODE_ENV || 'development',
  port = process.env.PORT || 3000;


/*
 |--------------------------------------------------------------------------
 | Include Config Base on Environment
 |--------------------------------------------------------------------------
 */
var config = require('./config')[env];


/*
 |--------------------------------------------------------------------------
 | Get the Express object
 |--------------------------------------------------------------------------
 */
var app = module.exports = express();


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
 | Spin Up the App
 |--------------------------------------------------------------------------
 */
app.listen(port);
console.log('Successfully started web server on port ' + port + '.');
