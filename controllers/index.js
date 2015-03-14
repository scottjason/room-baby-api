exports.index = function(req, res, next) {
  res.render('index');
};

exports.sendVideo = function(req, res, next) {
  console.log('sendVideo', req);
};