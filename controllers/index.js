var Video = require('../models/video');

exports.ping = function(req, res, next) {
  res.render('index');
};

exports.videoStatus = function(req, res, next) {
  if(req.body.status === 'uploaded') {
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
  var archiveId = req.params.archiveId;
  var partnerId = req.partnerId.partnerId;
  var videoUrl = new Video().generateUrl(partnerId, archiveId);
  console.log('generateUrl', videoUrl);
  res.locals.videoUrl = videoUrl;
  res.render('video');
};
