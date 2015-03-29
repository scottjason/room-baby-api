var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.ping);
router.get('/:partnerId/:archiveId', controller.generateVideo);
router.post('/video-status', controller.videoStatus);

module.exports = router;
