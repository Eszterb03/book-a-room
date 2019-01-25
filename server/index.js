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
  
app.get('/rooms/:name', (req, res) => {
  const roomName = req.params.name;
  Room.findOne({ name: roomName }).populate('bookings').exec((err, room) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while searching for room' }] });
    }
    return res.json(room)
  });
});
