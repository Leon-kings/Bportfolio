const express = require('express');
const { 
  createMessage, 
  deleteOder, 
  getOderById, 
  getMessage, 
  updateOder 
} = require('../controllers/messageController');

const router = express.Router();

router.get('/', getMessage);
router.post('/', createMessage);
router.get('/:id', getOderById);
router.put('/:id', updateOder);
router.delete('/:id', deleteOder);

module.exports = router;
