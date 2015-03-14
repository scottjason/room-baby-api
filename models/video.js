var mongoose = require('mongoose');
var config = require('../config')

var videoSchema = new mongoose.Schema({
	url: String,
	status: String,
	name: String,
	archiveId: String,	
	sessionId: String,
	partnerId: Number,
	createdAt: Date,
	size: Number,
	duration: Number,
	updatedAt: Number
});

videoSchema.methods.generateUrl = function(partnerId, archiveId) {
	return config.aws.base + config.aws.buckets.videoBucket + partnerId + '/' + archiveId + '.mp4';
};

module.exports = mongoose.model('Video', videoSchema);