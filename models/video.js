var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
	status: String,
	name: String,
	sessionId: String,
	partnerId: Number,
	createdAt: Date,
	size: Number,
	duration: Number,
	updatedAt: Number
});

module.exports = mongoose.model('Video', videoSchema);