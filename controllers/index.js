var Video = require('../models/video');

exports.render = function(req, res, next) {
  res.render('index');
};

exports.getVideoStatus = function(req, res, next) {

  console.log("GET VIDEO STATUS", req.body);
  if(req.body.status === 'uploaded') {
    console.log("Saving Video");
    var archiveId = req.body.id;
    var partnerId = req.body.partnerId;
    delete req.body.id;
    var video = new Video(req.body);
    video.archiveId = archiveId;
    video.url = video.generateUrl(partnerId, archiveId);
    video.save(function(err, savedVideo) {
    console.log("Video Saved", savedVideo);
      res.status(200).end();
    });
  } else {
    res.status(200).end();
  };
};

exports.generateVideo = function(req, res, next) {
  var archiveId = req.params.archiveId;
  var partnerId = req.params.partnerId;
  var videoUrl = new Video().generateUrl(partnerId, archiveId).toString();
  var siteUrl = 'https://room-baby-video-api.herokuapp.com/' + partnerId + '/' + archiveId;
  var fbAppId = '921064881267563';
  res.locals.siteUrl = siteUrl;
  res.locals.videoUrl = videoUrl;
  res.locals.fbAppId = fbAppId;
  res.render('video');
};
