var request = require('request');

var sendVideo = function(videoObj) {
  var opts = { host: 'localhost', port: 3000, path:'/session/video-ready', method: 'POST' }
  request(opts, function(err, res, body){
	 console.log(err || res.statusCode);
  });
}

exports.ping = function(req, res, next) {
  res.render('index');
};

exports.getVideoStatus = function(req, res, next) {
  if(req.body.status.toString() === 'uploaded') {
	var videoObj = {};
	 videoObj.archiveId = req.body.id;
	 videoObj.sessionId = req.body.sessionId;
	 videoObj.size = req.body.size;
	 videoObj.duration = req.body.duration;
	 res.status(200).end();
	 sendVideo(videoObj);
  }
  res.status(200).end();
};