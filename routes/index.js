var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.render);
router.post('/embed', controller.generateVideo);

module.exports = router;