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

	 res.locals.sessionId = obj.sessionId;
	 res.locals.archiveId = obj.archiveId;
	 res.locals.size = obj.size;
	 res.locals.duration = obj.duration;
	 console.log(19);
	 res.render('video');
	 console.log(21);
  }
  else {
  	res.status(200).end();
  };
};