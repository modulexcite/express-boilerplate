var UserController = require(__base + '/app/controllers/users');

module.exports = function(app, config) {
  app.param('user', UserController.find);
  app.get('/users', UserController.index);
  app.get('/users/:user', UserController.view);
}
