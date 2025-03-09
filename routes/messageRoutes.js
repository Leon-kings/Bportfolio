const express = require("express");
const { createMessage , getMessage} = require("../controllers/messageController"); // Destructure correctly

const router = express.Router();

// POST request to create a new message
router.post("/", createMessage);
router.get("/", getMessage);

module.exports = router;
