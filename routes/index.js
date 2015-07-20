var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.render);
router.post('/video-status', controller.videoStatus);
router.get('/embed/:partnerId/:archiveId', controller.generateVideo);
router.get('/:broadcast_id', controller.renderBroadcast);
router.get('/get-broadcast/:broadcast_id', controller.getBroadcast);
router.get('/delete-broadcast/:broadcast_id', controller.deleteBroadcast);

module.exports = router;