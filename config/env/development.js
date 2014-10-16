module.exports = {

  /*
   |--------------------------------------------------------------------------
   | Basic Mongoose MongoDb Connection Info
   |--------------------------------------------------------------------------
   */
  mongooseDb: 'mongodb://localhost/express-boilerplate',

  /*
   |--------------------------------------------------------------------------
   | MongoStore MongoDb Connection Info
   |--------------------------------------------------------------------------
   */
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
