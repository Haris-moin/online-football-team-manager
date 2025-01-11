const express = require('express');
const { getTeam } = require('../controllers/teamController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getTeam);

module.exports = router;
