const express = require('express');
const router = express.Router();
const Student = require('../model/student.model');

//login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    //get the student by email
    const student = await Student.findOne({ email }).exec();
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // compare password
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful', student });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
