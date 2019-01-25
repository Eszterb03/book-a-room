const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors');

const passport = require("passport");
const auth = require("./auth");
const secret = require("./const");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');


const controllers = require('./controllers/index');

const PORT = 3001;
const app = express();

const config = require('./config');
mongoose.connect(
  config.dbRoute, { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

app.use(cors());
app.use(bodyParser());
app.listen(PORT, () => console.log("Running"));

app.get('/rooms', controllers.getRooms);

app.get('/room/:name', controllers.getRoom);

app.post('/book', controllers.createBooking);

app.delete('/rooms/:id', controllers.deleteBooking);

//authentication

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

app.get('/', (req, res) => res.sendStatus(200))

app.get('/me', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

app.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

app.get('/callback',
    passport.authenticate('google', { failureRedirect: '/', }),
    (req, res) => {
        res.redirect("/me");
    });
