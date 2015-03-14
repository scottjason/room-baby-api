var request = require('request');

var sendVideo = function(videoObj) {
  var opts = { method: 'post', body: videoObj, json: true, url: 'http://localhost:3000/session/video-ready' };
  request(opts, function(err, res, body){
  	console.log('6')
	 console.log(err || res.statusCode);
  });
}

exports.ping = function(req, res, next) {
  res.render('index');
};

exports.getVideoStatus = function(req, res, next) {
	console.log(req.status);
console.log('getVideoStatus', req.body);
console.log(req.body.status.toString() === 'uploaded');
  if(req.body.status.toString() === 'uploaded') {
	var videoObj = {};
	 videoObj.archiveId = req.body.id;
	 videoObj.sessionId = req.body.sessionId;
	 videoObj.size = req.body.size;
	 videoObj.duration = req.body.duration;
	 res.status(200).json();
	 sendVideo(videoObj);
  }
};