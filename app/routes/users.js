var controller = require(__base + '/app/controllers/users');

module.exports = function(app, io, config) {
  app.param('user', controller.find);
  app.get('/users', controller.index);
  app.get('/users/:user', controller.view);
}
