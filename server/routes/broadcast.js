var express = require('express');
var router = express.Router();
var broadcastCtrl = require('../controllers/broadcast');

router.get('/:broadcast_id', broadcastCtrl.renderBroadcast);
router.get('/get-broadcast/:broadcast_id', broadcastCtrl.getBroadcast);
router.get('/delete-broadcast/:broadcast_id', broadcastCtrl.deleteBroadcast);

module.exports = router;