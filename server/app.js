require('newrelic');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./config/database');
var config = require('./config');

var app = express();

app.set('port', process.env.PORT || 3001);
app.set('views', config.root + '/server/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');;

app.use(express.static(path.join(config.root, 'client')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use('/', require('./routes/video'));
app.use('/', require('./routes/broadcast'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json(err || new Error('server error'));
});

database.connect(function() {

  app.listen(app.get('port'), function() {
    console.log('Room Baby Api Listening on', app.get('port'));
  });
});


module.exports = app;
