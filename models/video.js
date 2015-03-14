var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({});

module.exports = mongoose.model('Video', videoSchema);