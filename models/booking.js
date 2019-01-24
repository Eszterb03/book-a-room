const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    room: { type: Schema.Types.ObjectId, ref: "rooms" },
});

module.exports = mongoose.model('bookings', bookingSchema);