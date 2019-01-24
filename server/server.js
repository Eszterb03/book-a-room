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

app.get('/rooms/:name', (req, res) => {
    const roomName = req.params.name;
    Room.findOne({ name: roomName }).exec((err, room) => {
        if (err) {
            console.log(err);
        }
        res.json(room)
    });
});

// app.post('/rooms/:name', (req, res) => {
//     const { date, time, user, room } = req.body;
//     const booking = new Booking({ date, time, user, room });
//     room.findOne({ name: roomName }).exec((err, foundRoom) => {

//         if (err) {
//             console.log(err);
//         }
//         if (isValidBooking(booking, foundRental)) {
//             booking.user = user;
//             booking.rental = foundRental;
//             foundRental.bookings.push(booking);

//             booking.save(function(err) {
//                 if (err) {
//                     return res.status(422).send({ errors: normalizeErrors(err.errors) });
//                 }
//                 foundRental.save();
//                 User.updateOne({ _id: user.id }, { $push: { bookings: booking } },
//                     function() {}
//                 );
//                 return res.json({ startAt: booking.startAt, endAt: booking.endAt, guests: booking.guests });
//             });
//         } else {
//             return res.status(422).send({ errors: [{ title: 'Invalid booking!', detail: 'Selected date is already booked.' }] });
//         }
//     });

//     function isValidBooking(proposedBooking, rental) {
//         let isValid = true;

//         if (rental.bookings && rental.bookings.length > 0) {
//             isValid = rental.bookings.every(function(booking) {
//                 const proposedStart = moment(proposedBooking.startAt);
//                 const proposedEnd = moment(proposedBooking.endAt);
//                 const actualStart = moment(booking.startAt);
//                 const actualEnd = moment(booking.endAt);

//                 return ((actualStart < proposedStart && actualEnd < proposedStart) ||
//                     (proposedEnd < actualEnd && proposedEnd < actualStart));
//             });
//         }
//         return isValid;
//     }

// }

// });