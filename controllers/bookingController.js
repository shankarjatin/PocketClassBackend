const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  const { studentId, instructorId, startTime, endTime } = req.body;
  try {
    const bookingId = await Booking.createBooking(studentId, instructorId, startTime, endTime);
    res.status(201).json({ bookingId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking.' });
  }
};

exports.getConfirmedBookings = async (req, res) => {
  const { instructorId } = req.params;
  try {
    const confirmedBookings = await Booking.getConfirmedBookings(instructorId);
    res.status(200).json(confirmedBookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookings.' });
  }
};
