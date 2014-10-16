module.exports = {
  mongooseDb: 'mongodb://localhost/express-boilerplate',
  mongoStore: {
    db: {
      name: 'express-boilerplate',
      servers: [{
        host: "localhost",
			  port: 27017,
			  options: {
				  socketOptions: {
					  keepAlive: 1
				  }
			  }
      }]
    },
    username: 'root',
    password: ''
  }
}
