var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.index);
router.get('/video-ready', controller.sendVideo);

module.exports = router;
