const Hotel = require("../model/hotel");
const Room = require("../model/room");

const Transaction = require("../model/transaction");

exports.getAllHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.send(hotels);
    })
    .catch((err) => console.log(err));
};

exports.getHotels = async (req, res, next) => {
  const limit = req.query.limit;
  const page = req.query.page ? req.query.page : 1;
  const skip = (page - 1) * limit;

  const count = await Hotel.find().then((hotels) => {
    return hotels.length;
  });

  Hotel.find()
    .limit(limit)
    .skip(skip)
    .then((hotels) => {
      res.json({
        hotels: hotels,
        count: count,
      });
    })
    .catch((err) => console.log(err));
};

exports.getHotelsByCity = (req, res, next) => {
  Hotel.find({ city: req.query.city })
    .then((hotels) => {
      res.send(hotels);
    })
    .catch((err) => console.log(err));
};

exports.getHotelsByType = (req, res, next) => {
  Hotel.find({ type: req.query.type })
    .then((hotels) => {
      res.send(hotels);
    })
    .catch((err) => console.log(err));
};

exports.getHotelsByTop3 = (req, res, next) => {
  Hotel.find()
    .sort({ rating: "desc" })
    .limit(3)
    .then((hotels) => {
      res.send(hotels);
    })
    .catch((err) => console.log(err));
};

exports.getHotelsBySearch = async (req, res, next) => {
  const numPeople = Math.floor(
    +req.query.options.adult + +req.query.options.children / 2
  );
  const numRooms = +req.query.options.room;
  const minPrice = +req.query.options.minPrice;
  const maxPrice = +req.query.options.maxPrice;

  const rooms = await Room.find({
    maxPeople: { $gte: numPeople },
  });
  const roomIds = rooms.map((room) => room._id.toString());

  Hotel.find({
    city: { $regex: req.query.destination, $options: "i" },
    cheapestPrice: { $gte: minPrice || 0, $lte: maxPrice || Infinity },
  })
    .then((hotels) => {
      const result = hotels.filter((hotel) => {
        const roomId = hotel.rooms.filter((room) => {
          if (roomIds.includes(room)) {
            return room;
          }
        });
        if (roomId.length >= numRooms) {
          return hotel;
        }
      });
      res.send(result);
    })
    .catch((err) => console.log(err));
};

exports.getHotelById = (req, res, next) => {
  const hotelId = req.params.hotelId;
  Hotel.findById(hotelId)
    .populate("rooms")
    .then((hotel) => {
      res.send(hotel);
    })
    .catch((err) => console.log(err));
};

exports.postAddHotel = (req, res, next) => {
  const {
    name,
    city,
    type,
    desc,
    distance,
    title,
    featured,
    address,
    cheapestPrice,
  } = req.body;
  const rooms = req.body.rooms.split(",");
  const photos = req.body.photos.split(",");
  console.log(req.body);
  Room.find({ title: { $in: rooms } })
    .then((rooms) => {
      const roomIds = rooms.map((room) => room._id.toString());
      const newHotel = new Hotel({
        name: name,
        city: city,
        type: type,
        desc: desc,
        rooms: roomIds,
        distance: distance,
        photos: photos,
        title: title,
        featured: featured,
        address: address,
        cheapestPrice: cheapestPrice,
      });
      newHotel
        .save()
        .then((results) => {
          console.log("ADDED HOTEL: ", results);
          res.status(200).end();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.deleteHotel = (req, res, next) => {
  const hotelId = req.query.id;
  
  Transaction.find({
    hotel: hotelId,
    status: { $ne: "Checkout" },
  })
    .then((trans) => {
      if (trans[0]) {
        res
          .status(400)
          .json({
            message: "Cannot Delete! There are transactions havenot checkout!",
          });
      } else {
        Hotel.findByIdAndRemove(hotelId)
          .then((results) => {
            console.log("DELETED HOTEL: ", results);
            res.status(200).end();
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

exports.editHotel = (req, res, next) => {
  const hotelId = req.params.hotelId;
  const {
    name,
    city,
    type,
    desc,
    rooms,
    distance,
    photos,
    title,
    featured,
    address,
    cheapestPrice,
  } = req.body;

  Room.find({ title: { $in: rooms } })
    .then((rooms) => {
      const roomIds = rooms.map((room) => room._id.toString());
      const updatedHotel = {
        name: name,
        city: city,
        type: type,
        desc: desc,
        rooms: roomIds,
        distance: distance,
        photos: photos,
        title: title,
        featured: featured,
        address: address,
        cheapestPrice: cheapestPrice,
      };
      Hotel.findByIdAndUpdate(hotelId, updatedHotel, { new: true })
        .then((results) => {
          console.log("UPDATED HOTEL: ", results);
          res.status(200).end();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
