var Video = require('../models/video');
var config = require('../config');

exports.videoStatus = function(req, res, next) {
  if (req.body.status === 'uploaded') {
    var archiveId = req.body.id;
    var partnerId = req.body.partnerId;
    delete req.body.id;
    var video = new Video(req.body);
    video.sessionId = req.body.sessionId;
    video.archiveId = archiveId;
    video.createdAt = new Date().getTime();
    video.url = video.generateUrl(partnerId, archiveId);
    video.save(function(err, savedVideo) {
      res.status(200).end();
    });
  } else {
    res.status(200).end();
  };
};

exports.generateVideo = function(req, res, next) {
  var videoUrl = config.aws.base + config.aws.bucket + req.params.partnerId + '/' + req.params.archiveId + '/archive.mp4';
  var siteUrl = 'https://room-baby-video-api.herokuapp.com/embed/' + req.params.partnerId + '/' + req.params.archiveId;
  var fbAppId = '921064881267563';
  res.locals.siteUrl = siteUrl;
  res.locals.videoUrl = videoUrl;
  res.locals.fbAppId = fbAppId;
  res.render('video');
};