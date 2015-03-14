var env = require('../env');
console.log(env);

module.exports = {
  db: {
  	uri: process.env.MONGOLAB_URI || env.MONGOLAB_URI,
    opts: {
      server: {
        socketOptions: { keepAlive: 1 }
     }
    }
  }
}