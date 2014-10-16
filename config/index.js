/*
 |--------------------------------------------------------------------------
 | Node and 3rd Party Packages
 |--------------------------------------------------------------------------
 */
var path = require('path'),
  extend = require('util')._extend;


/*
 |--------------------------------------------------------------------------
 | Get Environment Config Files
 |--------------------------------------------------------------------------
 */
var dev = require('./env/development'),
  prod = require('./env/production'),
  test = require('./env/test');


/*
 |--------------------------------------------------------------------------
 | Add Some Default Variables
 |--------------------------------------------------------------------------
 */
var defaults = {
  root: path.normalize(__dirname + '/..') // identical to our global __base var
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
