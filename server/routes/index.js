var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers');

router.get('/', indexCtrl.render);

module.exports = router;