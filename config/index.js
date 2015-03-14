var env = require('../env');

module.exports = {
  db: {
  	uri: env.MONGOLAB_URI,
    opts: {
      server: {
        socketOptions: { keepAlive: 1 }
     }
    }
  }
}