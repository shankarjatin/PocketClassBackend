const Instructor = require('../models/instructorModel');

exports.getInstructors = async (req, res) => {
  const filters = req.query;
  try {
    const instructors = await Instructor.getInstructors(filters);
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve instructors.' });
  }
};
