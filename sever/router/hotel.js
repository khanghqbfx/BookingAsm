const express = require('express');
const router = express.Router();

const hotelController = require('../controller/hotel');

router.get('/hotels', hotelController.getHotels);

router.get('/allHotels', hotelController.getAllHotels);

router.get('/hotels/city', hotelController.getHotelsByCity);

router.get('/hotels/type', hotelController.getHotelsByType);

router.get('/hotels/Top3', hotelController.getHotelsByTop3);

router.get('/hotels/search', hotelController.getHotelsBySearch);

router.get('/hotels/:hotelId', hotelController.getHotelById);

router.post('/add-hotel', hotelController.postAddHotel);

router.delete('/delete-hotel', hotelController.deleteHotel);

router.put('/edit-hotel/:hotelId', hotelController.editHotel);

module.exports = router;