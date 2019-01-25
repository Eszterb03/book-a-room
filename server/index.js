const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const controllers = require('./controllers/index');

const PORT = 3001;
const app = express();

const config = require('./config');
mongoose.connect(
    config.dbRoute, { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

app.use(bodyParser());
app.listen(PORT, () => console.log("Running"));

app.get('/rooms', controllers.getRooms);

app.get('/room/:name', controllers.getRoom);

app.post('/book', controllers.createBooking);

app.delete('/rooms/:id', controllers.deleteBooking);