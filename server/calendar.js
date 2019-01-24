const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://Eszter:eszter2019@ds111455.mlab.com:11455/bookaroom', );