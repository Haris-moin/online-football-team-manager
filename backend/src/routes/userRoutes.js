const express = require('express');
const { userAuthHandler } = require('../controllers/userController');

const router = express.Router();

router.post('/auth', userAuthHandler);

module.exports = router;
