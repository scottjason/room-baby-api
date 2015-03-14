exports.ping = function(req, res, next) {
  res.render('index');
};

exports.sendVideo = function(req, res, next) {
  console.log('sendVideo req.body', req.body);
  console.log('');
  console.log('------------------');
  console.log('');
  console.log('sendVideo req', req);
};