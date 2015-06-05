var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.render);
router.get('/:partnerId/:archiveId', controller.generateVideo);
router.post('/video-status', controller.getVideoStatus);

module.exports = router;