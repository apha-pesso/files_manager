// Index routes
const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');
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

// some more routes for connection Authentication
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', AuthController.getMei);

// Add routes for file
router.post('/files', FilesController.postUpload);

module.exports = router;
