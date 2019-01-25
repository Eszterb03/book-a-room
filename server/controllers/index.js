const Room = require('../models/room');
const Booking = require('../models/booking');

exports.getRooms = (req, res) => {
  Room.find({}).select('booking').populate('bookings', '-_id -__v').select('-_id').exec((err, rooms) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while searching for room' }] });
    }
    const meetingRooms = rooms.map(room => room.bookings);
    const bookings = [];
    for(let i = 0; i < meetingRooms.length; i++ ) {
      if (meetingRooms[i].length > 0) {
        for (let j = 0; j < meetingRooms[i].length; j++ ) {
          bookings.push(meetingRooms[i][j]);
        }
      }
    }
    return res.json(bookings);
  });
}

exports.getRoom = (req, res) => {
  const roomName = req.params.name;
  Room.findOne({ name: roomName }).populate('bookings').exec((err, room) => {
    if (err) {
      return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while searching for room' }] });
    }

    return res.json(room)
  });
}

exports.createBooking = (req, res) => {
    const { room, start, end } = req.body;
    const booking = new Booking({ start, end });

    Room.findOne({ name: room })
        .populate('bookings')
        .exec(function(err, foundRoom) {
            if (err) {
                return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while searching for room' }] });
            }
            booking.room = foundRoom.name;
            foundRoom.bookings.push(booking);

        booking.save(function(err){
          if (err) {
            return res.status(400).send({ errors: [{ title: 'Error', detail: 'Error while saving booking' }] });
          }
          foundRoom.save();
                return res.json({ start: booking.start, end: booking.end, title: booking.title });
            });
        });
}

exports.deleteBooking = (req, res) => {
    const { id } = req.params
    Room.findByIdAndDelete({ _id: id })
        .then(room => {
            res.status(201).json(room)
        })
        .catch(error => {
            res.status(400).json({ error })
        })
};