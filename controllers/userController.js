const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwtConfig');
const punycode = require('punycode/');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  if (!['instructor', 'student'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const userId = await User.createUser(email, password, role);
    res.status(201).json({ userId, message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);  // Good for debugging, make sure to remove or comment out in production
  
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Use validatePassword to check the password
      const isValid = await User.validatePassword(email, password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);  // Logging the error can help in debugging
      res.status(500).json({ error: 'Login failed' });
    }
  };
  
