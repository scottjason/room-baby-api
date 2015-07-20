var Broadcast = require('../models/broadcast');

exports.renderBroadcast = function(req, res, next) {
  var broadcastId = req.params.broadcast_id;
  Broadcast.findById(broadcastId, function(err, broadcast) {
    if (err) return next(err);
    if (!broadcast) {
      var siteUrl = 'https://roombaby-api.herokuapp.com/broadcast/' + req.params.broadcast_id;
      var fbAppId = '921064881267563';
      res.locals.fbAppId = fbAppId;
      res.locals.siteUrl = siteUrl;
      res.render('broadcast-expired');
    } else {
      var siteUrl = 'https://roombaby-api.herokuapp.com/broadcast/' + req.params.broadcast_id;
      var fbAppId = '921064881267563';
      res.locals.fbAppId = fbAppId;
      res.locals.siteUrl = siteUrl;
      res.render('broadcast');
    }
  });
};

exports.getBroadcast = function(req, res, next) {
  var broadcastId = req.params.broadcast_id;
  Broadcast.findById(broadcastId, function(err, broadcast) {
    if (err) return next(err);
    if (broadcast) {
      broadcast.connectCount++
        broadcast.save(function(err, savedBroadcast) {
          if (err) return next(err);
          res.status(200).send(savedBroadcast);
        });
    } else {
      var siteUrl = 'https://roombaby-api.herokuapp.com/broadcast/' + req.params.broadcast_id;
      var fbAppId = '921064881267563';
      res.locals.fbAppId = fbAppId;
      res.locals.siteUrl = siteUrl;
      res.render('broadcast-expired');
    }
  });
};

exports.deleteBroadcast = function(req, res, next) {
  Broadcast.findById(req.params.broadcast_id).remove(function(err, numAffected) {
    res.sendStatus(200);
  });
}
