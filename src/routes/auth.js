const express = require('express');
const router = express.Router();
const Student = require('../model/student.model');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', req.body);

  try {
    console.log('Login Attempt:', { email, password });
    const student = await Student.findOne({ email }).exec();
    console.log('Student Found:', student);

    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await student.comparePassword(password);
    console.log('Password Valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', student });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
