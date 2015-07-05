var mongoose = require('mongoose');
var config = require('../config')

var videoSchema = new mongoose.Schema({
  url: String,
  status: String,
  name: String,
  archiveId: String,
  sessionId: String,
  partnerId: Number,
  createdAt: Number,
  size: Number,
  duration: Number
});

videoSchema.methods.generateUrl = function(partnerId, archiveId) {
  return config.aws.base + config.aws.bucket + partnerId + '/' + archiveId + '/archive.mp4';
};


module.exports = mongoose.model('Video', videoSchema);
