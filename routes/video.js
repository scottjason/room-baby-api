var express = require('express');
var router = express.Router();
var videoCtrl = require('../controllers/video');

router.post('/video-status', videoCtrl.videoStatus);
router.get('/embed/:partnerId/:archiveId', videoCtrl.generateVideo);

module.exports = router;