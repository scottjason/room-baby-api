/**
 * Database Configuration
 */

'use strict';

var mongoose = require('mongoose');
var config = require('./');

var obj = {};

var connect = function(cb) {
  obj.cb = cb;
  mongoose.connect(config.db.uri, config.db.opts);
};

var connected = function() {
  obj.cb();
  console.log("Database connected at", config.db.uri);
}

mongoose.connection.on('connected', connected);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('error', console.log);
mongoose.set('debug', true);

module.exports = {
  connect: connect
}
