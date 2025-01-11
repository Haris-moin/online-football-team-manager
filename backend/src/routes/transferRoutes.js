const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');

// Route to filter players on the transfer market - Authentication required
/**
 * @route GET /api/transfer-market/filter
 * @desc Filter players available for transfer by team name, player name, and price range
 * @access Private - Authentication required
 * @queryParam teamName {string} - Optional filter for team name
 * @queryParam playerName {string} - Optional filter for player name
 * @queryParam minPrice {number} - Optional filter for minimum price
 * @queryParam maxPrice {number} - Optional filter for maximum price
 */
router.get('/players', transferController.getTransferredPlayers);

// Route to toggle the transfer status (enable/disable) for a player - Authentication required
/**
 * @route POST /api/transfer-market/toggle-transfer
 * @desc Toggle the transfer status (list/unlist) for a specific player
 * @access Private - Authentication required
 * @bodyParam playerId {string} - ID of the player to be toggled
 * @bodyParam askingPrice {number} - Optional asking price if enabling transfer listing
 */
router.post('/toggle-transfer', transferController.toggleTransferListing);

// Route to purchase a player from the transfer market - Authentication required
/**
 * @route POST /api/transfer-market/purchase
 * @desc Complete a transfer by purchasing a player from the transfer market
 * @access Private - Authentication required
 * @bodyParam playerId {string} - ID of the player to be purchased
 * @bodyParam buyerTeamId {string} - ID of the team making the purchase
 */
router.post('/purchase', transferController.purchasePlayer);

module.exports = router;
