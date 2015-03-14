var env = require('../env');
console.log(env);

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