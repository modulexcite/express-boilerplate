var cluster = require('cluster');

/*
 |--------------------------------------------------------------------------
 | Create Cluster Forks for Each Server
 |--------------------------------------------------------------------------
 */
if(cluster.isMaster) {

  // Get CPU count
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for(var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', function() {
    cluster.fork();
  });
}
else {
  require('./server');
}
