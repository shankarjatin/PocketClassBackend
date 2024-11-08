const Availability = require('../models/availabilityModel');
const { v4: uuidv4 } = require('uuid'); // Import the UUID v4 module

exports.createOrUpdateAvailability = async (req, res) => {
    const { startTime, endTime } = req.body;
    let { id } = req.body; // Extract the ID if provided
    const instructorId = req.user.userId; // Retrieved from the token
  console.log(instructorId); //
    // Generate a new ID if not provided
    if (!id) {
        id = uuidv4();
    }
  
    try {
        const availabilityId = await Availability.createOrUpdateAvailability(id, instructorId, startTime, endTime);
        res.status(201).json({ availabilityId: id }); // Return the ID used or created
    } catch (error) {
        console.error(error); // It's good practice to log the error for debugging
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
