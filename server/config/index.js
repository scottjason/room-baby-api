/**
 * Main Config
 */

'use strict';

var env = {};
var path = require('path');

if (process.env.NODE_ENV !== 'production') {
  env = require('../../env.js');
}

module.exports = {
  root: path.normalize(__dirname + '../../../'),
  db: {
    uri: process.env.MONGOLAB_URI || env.MONGOLAB_URI_PROD,
    opts: {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      }
    }
  },
  aws: {
    base: 'https://s3-us-west-2.amazonaws.com/',
    bucket: 'rtc-videos/'
  }
};
