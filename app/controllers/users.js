exports.find = function(req, res, next, name) {
  // find user by name in mongoose
  // logic here cb()

  var user = {
    name: 'John Doe',
    id: 'asdadabdsaduqyqw71321731313',
    occupation: 'Developer'
  }

  req.user = user;

  next();
}

exports.index = function(req, res, next) {
  res.send('users index method');
}

exports.view = function(req, res, next) {
  var user = req.user;

  res.json(user);
}
