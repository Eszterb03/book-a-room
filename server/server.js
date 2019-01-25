const Room = require('../models/room');
const Booking = require('../models/booking')
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


const PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://Gabor:gabor2019@ds111455.mlab.com:11455/bookaroom";

// connects our back end code with the database
mongoose.connect(
    dbRoute, { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

app.listen(PORT, () => console.log("Running"));

app.get('/rooms', (req, res) => {
    Room.find({}).select('booking').exec((err, rooms) => {
        if (err) {
            console.log(err);
        } else {
            const roomElement = [];
            rooms.forEach(element => {
                roomElement.push(element)
            });
            res.json({ rooms: roomElement })
        }
    });
})

app.get('/rooms/:name', (req, res) => {
    const roomName = req.params.name;
    Room.findOne({ name: roomName }).exec((err, room) => {
        if (err) {
            console.log(err);
        }
        res.json(room)
    });
})

// Delete a booking
app.delete('/rooms/:id', (req, res) => {
    const { id } = req.params
    Room.findByIdAndDelete({ _id: id })
        .then(room => {
            res.status(201).json(room)
        })
        .catch(error => {
            res.status(400).json({ error })
        })
});