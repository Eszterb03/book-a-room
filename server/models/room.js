const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: { type: String, required: true },
    booking: [{ type: Schema.Types.ObjectId, ref: "bookings" }]
});

module.exports = mongoose.model('rooms', roomSchema);