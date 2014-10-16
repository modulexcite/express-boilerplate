module.exports = function(io) {
  var ioNamespace = io.of('/users');

  return ioNamespace;
}
