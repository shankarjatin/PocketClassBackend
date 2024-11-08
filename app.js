const express = require('express');
const app = express();
const availabilityRoutes = require('./routes/availabilityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json()); // Middleware for parsing JSON requests

// Routes
app.use('/api', availabilityRoutes);
app.use('/api', bookingRoutes);
app.use('/api', instructorRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
