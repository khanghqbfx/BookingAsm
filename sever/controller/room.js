const Hotel = require('../model/hotel');
const { findById } = require('../model/room');
const Room = require('../model/room');
const Transaction = require('../model/transaction');

exports.getRooms = async (req, res, next) => {
    const limit = req.query.limit;
    const page = req.query.page ? req.query.page : 1
    const skip = (page - 1) * limit
    
    const count = await Room.find().then(rooms => {
        return rooms.length
    })

    Room.find().limit(limit).skip(skip)
        .then(rooms => {
            res.json({
                rooms: rooms,
                count: count
            });
        })
        .catch(err => console.log(err));
};

exports.getRoomById = (req, res, next) => {
    const roomId = req.params.roomId;
    Room.findById(roomId)
        .then(room => {
            res.send(room)
        })
        .catch(err => console.log(err));
};

exports.postAddRoom = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const maxPeople = req.body.maxPeople;
    const desc = req.body.desc;
    const hotelId = req.body.hotelId;
    const roomNumbers = req.body.roomNumbers.split(',');
    
    const newRoom = new Room({
        title: title,
        price: price,
        maxPeople: maxPeople,
        desc: desc,
        roomNumbers: roomNumbers
    })
    newRoom.save()
        .then(results => {
            console.log(results._id.toString());
            Hotel.findByIdAndUpdate(
                hotelId,
                { $push: { rooms: results._id.toString() } }
            ).then(hotel => {
                console.log('ADDED ROOM: ', results, 'and UPDATED ROOM HOTEL:', hotel)
                res.status(200).end()
            })
        })
        .catch(err => console.log(err));
};

exports.deleteRoom = (req, res, next) => {
    const roomId = req.query.id;
    
    Transaction.find({
        status: {$ne: "Checkout"}
    })
        .populate('hotel')
        .then(trans => {
            const roomIds = []
            trans.forEach(tran => {
                tran.hotel.rooms.forEach(id => roomIds.push(id))
            });

            Room.findById(roomId)
            .then(room => {
                if(roomIds.includes(roomId)) {
                    res.status(400).json({message: 'Cannot Delete! There are transactions havenot checkout!'})
                }  else {
                    room.delete();
                    console.log('DELETED ROOM: ',room);
                    res.status(200).end();
                }
            })
            .catch(err => console.log(err));
            })
        .catch(err => console.log(err));
};

exports.editRoom = (req, res, next) => {
    const roomId = req.params.roomId;
    const {title, price, maxPeople, desc} = req.body;
    const roomNumbers = req.body.roomNumbers.map(roomNumber => +roomNumber)
    
    const updatedRoom = {
        title: title,
        price: price,
        maxPeople: maxPeople,
        desc: desc,
        roomNumbers: roomNumbers
    }

    Room.findByIdAndUpdate(roomId, updatedRoom, {new: true})
        .then(results => {
            console.log('UPDATED ROOM: ',results);
            res.status(200).end();
        })
        .catch(err => console.log(err));
};