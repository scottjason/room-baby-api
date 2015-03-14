var request = require('request');

var sendVideo = function(videoObj) {
  console.log('sendVideo', videoObj);
  var opts = { host: 'localhost', port: 3000, path: '/session/video-ready', method: 'POST', body: videoObj }
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
  if(req.body.status === 'uploaded') {
  	console.log(req.body.status);
	var videoObj = {};
	 videoObj.archiveId = req.body.id;
	 videoObj.sessionId = req.body.sessionId;
	 videoObj.size = req.body.size;
	 videoObj.duration = req.body.duration;
	 res.status(200).json();
	 console.log('sent response');
	 sendVideo(videoObj);
  }
  else {
  	console.log(req.body.status);
 	 // res.status(200).end();
  };
};