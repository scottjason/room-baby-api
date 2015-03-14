var request = require('request');

var sendVideo = function(videoObj) {
	var opts = {
	 uri: "http://localhost:3000/session/video-ready",
  	 method: "POST",
  	 body: videoObj,
  	 json: true
  	}
	
  request(opts, function(err, res, body){
	 console.log(err || res.statusCode);
  });
}

exports.ping = function(req, res, next) {
  res.render('index');
};

exports.getVideoStatus = function(req, res, next) {
  if(req.body.status === 'uploaded') {
	var videoObj = {};
	 videoObj.archiveId = req.body.id;
	 videoObj.sessionId = req.body.sessionId;
	 videoObj.size = req.body.size;
	 videoObj.duration = req.body.duration;
	 res.status(200).end();
	 sendVideo(videoObj);
  }
};