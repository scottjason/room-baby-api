var Video = require('../models/video');
var Broadcast = require('../models/broadcast');
var config = require('../config');

exports.render = function(req, res, next) {
  res.render('index');
};
