var Video = require('../models/video');

exports.ping = function(req, res, next) {
  res.render('index');
};

exports.videoStatus = function(req, res, next) {
  if(req.body.status === 'uploaded') {
  	console.log('reqbody', req.body);
  	new Video(req.body)
  	  .save(function(err, video){
  	  	console.log('saved video', video);
  	  	res.status(200).end();
  	  })

  }
  else {
  	res.status(200).end();
  };
};