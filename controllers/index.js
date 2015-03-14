var request = require('request');

var sendVideo = function(videoObj) {
  var opts = { host: 'http://localhost', port: 3000, path: '/session/video-ready', method: 'POST', body: videoObj }
  request(opts, function(err, res, body){
  	if (!error && response.statusCode == 200) { 
  	  console.log('Success sending video obj', res.statusCode) 
  	}
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
	 return;
  }
  res.status(200).end();
};