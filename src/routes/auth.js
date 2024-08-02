const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../model/student.model');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login Attempt:', { email, password });

  try {
    const student = await Student.findOne({ email }).exec();
    console.log('Student Found:', student);

    if (!student) {
      console.log('Student not found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    console.log('Password Valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const payload = { user: { id: student.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, student }); 
    });

  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
