/*
 |--------------------------------------------------------------------------
 | Module depencies
 |--------------------------------------------------------------------------
 */
var mongoose = require('mongoose');


/*
 |--------------------------------------------------------------------------
 | Mongoose models
 |--------------------------------------------------------------------------
 */
var User = mongoose.model('User');


/**
 * Find a user by mongo id and attach it to the req object
 * @param  {Object}   req  Express Request object
 * @param  {Object}   res  Express Response object
 * @param  {Function} next Express next function
 * @param  {String}   id   The users mongodb id
 */
exports.find = function(req, res, next, id) {
  User.findOne({ _id: id }, function(err, user) {
    if (err) {
      return next(err);
    }

    req.user = user;

    next();
  });
}

/**
 * Render our index file that spits out all users from db
 * @param  {Object}   req  Express Request object
 * @param  {Object}   res  Express Response object
 * @param  {Function} next Express next function
 */
exports.index = function(req, res, next) {
  User.find().exec(function(err, users) {
    if (err) {
      return next(err);
    }

    res.render('users/index', {
      users: users
    });
  });
}

/**
 * Create a new user
 * @param  {Object}   req  Express Request object
 * @param  {Object}   res  Express Response object
 * @param  {Function} next Express next function
 */
exports.store = function(req, res, next) {
  console.log(req.body);
}

/**
 * View a specific user
 * @param  {Object}   req  Express Request object
 * @param  {Object}   res  Express Response object
 * @param  {Function} next Express next function
 */
exports.view = function(req, res, next) {
  var user = req.user;

  res.render('users/view', {
    user: user
  });
}

exports.update = function(req, res, next) {

}

exports.destroy = function(req, res, next) {

}
