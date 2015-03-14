exports.ping = function(req, res, next) {
  res.writeHead(200);
  res.end('Pinged Room Baby Videos Api\n');
};

exports.sendVideo = function(req, res, next) {
	console.log('sendVideo', req.params)
}