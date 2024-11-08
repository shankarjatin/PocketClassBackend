const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/bookings/:instructorId', authenticate, authorize(['student']), bookingController.createBooking);
router.get('/bookings/:instructorId', authenticate, authorize(['instructor']), bookingController.getConfirmedBookings);

module.exports = router;
