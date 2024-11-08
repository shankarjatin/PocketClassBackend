const Availability = require('../models/availabilityModel');

exports.createOrUpdateAvailability = async (req, res) => {
  const { id, instructorId, startTime, endTime } = req.body;
  try {
    const availabilityId = await Availability.createOrUpdateAvailability(id, instructorId, startTime, endTime);
    res.status(201).json({ availabilityId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create or update availability.' });
  }
};

exports.getAvailabilityByInstructor = async (req, res) => {
  const { instructorId } = req.params;
  try {
    const availableSlots = await Availability.getAvailabilityByInstructor(instructorId);
    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve availability.' });
  }
};

exports.updateAvailabilityStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await Availability.updateAvailabilityStatus(id, status);
    res.status(200).json({ message: 'Availability status updated.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update availability status.' });
  }
};
