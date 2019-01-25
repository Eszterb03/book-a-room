const Room = require('../models/room');
const Booking = require('../models/booking')
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const auth = require("./auth");
const secret = require("./const");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');


passport.use(new GoogleStrategy({
    clientID: secret.clientId,
    clientSecret: secret.clientSecret,
    callbackURL: secret.redirect,
    //accessType: 'offline'
  }, (accessToken, refreshToken, profile, cb) => {
    // Extract the minimal profile information we need from the profile object
    // provided by Google
    cb(null, profile);
  }));
  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

const PORT = 3001;
const app = express();
const router = express.Router();
app.use(session({
    secret: "Y0S3cr3t",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 600000
    }
}))
app.use(passport.initialize());
app.use(passport.session());

// this is our MongoDB database
const dbRoute = "mongodb://Gabor:gabor2019@ds111455.mlab.com:11455/bookaroom";

// connects our back end code with the database
mongoose.connect(
    dbRoute, { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));



app.get('/rooms/:name', (req, res) => {
    const roomName = req.params.name;
    Room.findOne({ name: roomName }).exec((err, room) => {
        if (err) {
            console.log(err);
        }
        res.json(room)
    });
});

app.get('/', (req, res) => res.sendStatus(200))

app.get('/me',(req, res) => { 
    res.send(req.session.passport.user.displayName);
})

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

app.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/', }),
  (req, res) => { 
    res.redirect("/me");
});

app.listen(PORT, () => console.log("Running"));

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