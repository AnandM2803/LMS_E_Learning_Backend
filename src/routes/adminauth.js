const express = require('express');
const router = express.Router();
const Admin = require('../model/admin.model');

// Login route
router.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const admin = await Admin.findOne({ email }).exec();

    // If student not found
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If login successful, return success message and student details
    res.json({ message: 'Login successful', admin });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;