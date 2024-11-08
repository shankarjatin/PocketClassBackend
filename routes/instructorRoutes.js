const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/instructors', authenticate, authorize(['student', 'instructor']), instructorController.getInstructors);

module.exports = router;
