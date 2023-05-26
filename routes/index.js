// Index routes
const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');

/*
router.get('/status', (req, res) => {
  const result = AppController.getStatus;
  res.statusCode = 200;
  res.send(result);
})
*/

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
