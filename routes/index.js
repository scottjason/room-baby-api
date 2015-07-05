var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.render);
router.post('/video-status', controller.videoStatus);
router.post('/embed', controller.generateVideo);

module.exports = router;