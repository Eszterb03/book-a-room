const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: { type: String, required: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: "bookings" }]
});

module.exports = mongoose.model('rooms', roomSchema);