/**
 * Node and 3rd party packages
 */

var path = require('path');
var extend = require('util')._extend;

/**
 * Get our environment based config files
 */

var dev = require('./env/development');
var prod = require('./env/production');
var test = require('./env/test');

/**
 * Default variables for our application
 */
var defaults = {
  root: path.normalize(__dirname + '/..') // identical to our global __base var
};

module.exports = {
  development: extend(dev, defaults),
  production: extend(prod, defaults),
  test: extend(test, defaults)
}
