const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/availability', authenticate, authorize(['instructor']), availabilityController.createOrUpdateAvailability);
router.get('/availability/:instructorId', authenticate, authorize(['student', 'instructor']), availabilityController.getAvailabilityByInstructor);
router.put('/availability/:id', authenticate, authorize(['instructor']), availabilityController.updateAvailabilityStatus);

module.exports = router;
