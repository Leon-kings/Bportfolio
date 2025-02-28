import express from 'express';
import { createMessage } from '../controllers/messageController.js';

const router = express.Router();

// POST request to create a new message
router.post('/messages', createMessage);

export default router;
