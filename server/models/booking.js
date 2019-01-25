const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    room: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true }
});

module.exports = mongoose.model('bookings', bookingSchema);
