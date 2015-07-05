var Video = require('../models/video');

exports.render = function(req, res, next) {
  res.render('index');
};

exports.generateVideo = function(req, res, next) {
  var videoUrl = 'https://s3-us-west-2.amazonaws.com/rtc-videos/45238782/e42810ef-7639-4fcd-aeb5-25c8833667c4/archive.mp4'
  var siteUrl = 'https://room-baby-video-api.herokuapp.com/' + req.body.partnerId + '/' + req.body.archiveId;
  var fbAppId = '921064881267563';
  res.locals.siteUrl = siteUrl;
  res.locals.videoUrl = videoUrl;
  res.locals.fbAppId = fbAppId;
  res.render('video');
};
