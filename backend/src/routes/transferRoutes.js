const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

router.get('/players', transferController.getTransferredPlayers);

router.post('/toggle-transfer', transferController.toggleTransferListing);

router.post('/purchase', transferController.purchasePlayer);

module.exports = router;
