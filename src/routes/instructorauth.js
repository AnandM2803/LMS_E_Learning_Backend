const express = require('express');
const router = express.Router();
const Instructor = require('../model/instructore.model');

// Login route
router.post('/instructorlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const instructor = await Instructor.findOne({ email }).exec();
    if (!instructor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await instructor.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', instructor });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;