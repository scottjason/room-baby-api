var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.ping);
router.post('/video-ready', controller.sendVideo);

module.exports = router;
