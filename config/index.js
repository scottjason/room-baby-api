if(!process.env.MONGOLAB_URI) var env = require('../env.js');

module.exports = {
  db: {
    uri: process.env.MONGOLAB_URI || env.MONGOLAB_URI_DEV,
    opts: {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
  },
  aws: {
    base: 'https://s3-us-west-1.amazonaws.com/',
    buckets: {
      videoBucket: 'room-baby-videos/'
    }
  }
};