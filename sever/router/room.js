const express = require('express');

const roomController = require('../controller/room')

const router = express.Router();

router.get('/rooms', roomController.getRooms);

router.get('/rooms/:roomId', roomController.getRoomById);

router.post('/add-room', roomController.postAddRoom);

router.delete('/delete-room', roomController.deleteRoom);

router.put('/edit-room/:roomId', roomController.editRoom);

module.exports = router;