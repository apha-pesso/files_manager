// Index routes
const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

/*
router.get('/status', (req, res) => {
  const result = AppController.getStatus;
  res.statusCode = 200;
  res.send(result);
})
*/
// Endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);

module.exports = router;
