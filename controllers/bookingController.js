const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  const { startTime, endTime } = req.body;
  const { instructorId } = req.params;
  const studentId = req.user.userId;
  try {
    const bookingId = await Booking.createBooking(studentId, instructorId, startTime, endTime);
    res.status(201).json({ bookingId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create booking.' });
  }
};

exports.getConfirmedBookings = async (req, res) => {
    const { instructorId }= req.params;  // Correctly accessing userId from req.user
    try {
      const confirmedBookings = await Booking.getConfirmedBookings(instructorId);
      res.status(200).json(confirmedBookings);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve bookings.' });
    }
  };
  
