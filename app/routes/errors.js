module.exports = function(app, config) {
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      var status = err.status || 500;

      res.status(status);
      res.render('errors/500', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(req, res, next) {
    res.status(404);
    res.render('errors/404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
}
