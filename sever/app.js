const express = require('express');
const cors = require('cors');
const path = require('path')



const mongoose = require('mongoose');

const app = express();

const hotelRoutes = require('./router/hotel');
const roomRoutes = require('./router/room');
const transactionRoutes = require('./router/transaction');
const userRoutes = require('./router/user');
const userHotels = require('./router/hotel')
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(express.json());

app.use(userRoutes);
app.use(userHotels)
app.use(roomRoutes)
app.use(transactionRoutes)



mongoose
    .connect("mongodb+srv://khang:nIMFZlbfybHPC3to@cluster0.ceoa8lw.mongodb.net/Khach_san?retryWrites=true&w=majority&appName=AtlasApp")
    .then(result => {
        app.listen(4000 ,  console.log("kết nối thành công"));
      
    })
    .catch(err => {
        console.log(err);
    });