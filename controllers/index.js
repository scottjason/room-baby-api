var request = require('request');

var sendVideo = function(obj, cb) {
	var url = 'http://localhost:300/session/' + obj.sessionId + '/' + obj.archiveId + '/' + obj.size + '/' + obj.duration;
	request.get(url, function(err, response, body){
		console.log(err || response);
		cb();
	})
}

exports.ping = function(req, res, next) {
  res.render('index');
};

exports.videoStatus = function(req, res, next) {
  if(req.body.status === 'uploaded') {
  	 var obj = {};
	 obj.sessionId = req.body.sessionId;
	 obj.archiveId = req.body.id;	 
	 obj.size = req.body.size;
	 obj.duration = req.body.duration;
	 sendVideo(obj, function(){
	   res.json();
  	});

	 // res.redirect('http://localhost:300/session/' + sessionId + '/' + archiveId + '/' + size + '/' + duration);
  }
  else {
  	res.json();
  };
};