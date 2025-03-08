const express = require('express');
const { createOrder } = require('../controllers/messageController.js'); // Destructure correctly

const router = express.Router();

// POST request to create a new message
router.post('/', createOrder);

module.exports = router;
