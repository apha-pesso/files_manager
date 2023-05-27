// Index routes
const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
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

// some more routes for connection
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', AuthController.getMei);

module.exports = router;
