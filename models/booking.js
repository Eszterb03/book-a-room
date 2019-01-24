const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    allday: { type: Boolean, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    title: { type: Schema.Types.ObjectId, ref: "rooms" }
});

module.exports = mongoose.model('bookings', bookingSchema);