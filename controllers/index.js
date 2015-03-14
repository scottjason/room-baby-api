exports.ping = function(req, res, next) {
  res.render('index');
};

exports.videoStatus = function(req, res, next) {
  if(req.body.status === 'uploaded') {
	 var sessionId = req.body.sessionId;
	 var archiveId = req.body.id;	 
	 var size = req.body.size;
	 var duration = req.body.duration;
	 res.redirect('http://localhost:300/session/' + sessionId + '/' + archiveId + '/' + size + '/' + duration);
  }
  else {
 	 res.status(200).end();
  };
};