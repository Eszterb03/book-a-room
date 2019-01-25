const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const Room = require('./models/room');
const Booking = require('./models/booking');
const User = require('./models/user');

const PORT = 3001;
const app = express();
const router = express.Router();

const config = require('./config');
mongoose.connect(
  config.dbRoute, { useNewUrlParser: true }
  );
  
const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
  
app.use(bodyParser());
app.listen(PORT, () => console.log("Running"));

app.get('/rooms', (req, res) => {
  Room.find({}).select('booking').populate('bookings').exec((err, rooms) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while searching for room' }] });
    }
    return res.json(rooms)
  });
});
  
app.get('/room/:name', (req, res) => {
  const roomName = req.params.name;
  Room.findOne({ name: roomName }).populate('bookings').exec((err, room) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while searching for room' }] });
    }
    return res.json(room)
  });
});

app.post('/book', (req, res) => {
  const { room, start, end } = req.body;
  const booking = new Booking({ start, end });

  Room.findOne({ name: room })
      .populate('bookings')
      .exec(function(err, foundRoom) {
        if (err) {
          return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while searching for room' }] });
        }
        booking.room = foundRoom.name;
        foundRoom.bookings.push(booking);

        booking.save(function(err){
          console.log(foundRoom)
          if (err) {
            console.log(err)
            return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while saving booking' }] });
          }
          console.log(booking)
          foundRoom.save();

          return res.json({ start: booking.start, end: booking.end, title: booking.title });
      });
    });
});
