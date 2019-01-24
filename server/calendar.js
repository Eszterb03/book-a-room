const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const db = mongojs('mongodb://Eszter:eszter2019@ds111455.mlab.com:11455/bookaroom', );

const clientId = '297249123317-bhf732cn7r57eac3fk8bqp2976otj15u.apps.googleusercontent.com';
const clientSecret = '7xk7sJbyF1MDASXmIhedjwxx';