var Video = require('../models/video');

exports.render = function(req, res, next) {
  res.render('index');
};

exports.videoStatus = function(req, res, next) {
	console.log('req.body', req.body);
  if (req.body.status === 'uploaded') {
    var archiveId = req.body.id;
    var partnerId = req.body.partnerId;
    delete req.body.id;
    var video = new Video(req.body);
    video.archiveId = archiveId;
    video.url = video.generateUrl(partnerId, archiveId);
    video.save(function(err, savedVideo) {
      res.status(200).end();
    });
  } else {
    res.status(200).end();
  };
};


exports.generateVideo = function(req, res, next) {
  var videoUrl = 'https://room-baby-video-api.herokuapp.com/rtc-videos/' + req.body.partnerId + '/' + req.body.archiveId + '/archive.mp4';
  var siteUrl = 'https://room-baby-video-api.herokuapp.com/' + req.body.partnerId + '/' + req.body.archiveId;
  console.log('##### Site URL', siteUrl);
  var fbAppId = '921064881267563';
  res.locals.siteUrl = siteUrl;
  res.locals.videoUrl = videoUrl;
  res.locals.fbAppId = fbAppId;
  res.render('video');
};
