var Video = require('../models/video');

exports.ping = function(req, res, next) {
  res.render('index');
};

exports.videoStatus = function(req, res, next) {
  if(req.body.status === 'uploaded') {
    var archiveId = req.body.id;
    delete req.body.id;
    var video = new Video(req.body);
    video.archiveId = archiveId;
    video.url = video.generateUrl(video.parnterId, video.archiveId);
  	video.save(function(err, savedVideo){
  	  console.log('saved video', savedVideo);
  	  	res.status(200).end();
  	  })
  }
  else {
  	res.status(200).end();
  };
};