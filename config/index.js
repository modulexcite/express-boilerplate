/*
 |--------------------------------------------------------------------------
 | Node and 3rd Party Packages
 |--------------------------------------------------------------------------
 */
var path = require('path');
var extend = require('util')._extend;


/*
 |--------------------------------------------------------------------------
 | Get Environment Config Files
 |--------------------------------------------------------------------------
 */
var dev = require('./env/development');
var prod = require('./env/production');
var test = require('./env/test');


/*
 |--------------------------------------------------------------------------
 | Add Some Default Variables
 |--------------------------------------------------------------------------
 */
var defaults = {
  root: path.normalize(__dirname + '/..'), // identical to our global __base var
  mongooseDebug: true
};


/*
 |--------------------------------------------------------------------------
 | Export Configs
 |--------------------------------------------------------------------------
 */
module.exports = {
  development: extend(dev, defaults),
  production: extend(prod, defaults),
  test: extend(test, defaults)
}
