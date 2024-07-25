const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../model/student.model');

router.post('/signup', async (req, res) => {
    const { firstName, lastName, userName, email, password, phone, address } = req.body;
    console.log('Signup attempt:', req.body);

    try {
        let user = await Student.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new Student({
            firstName,
            lastName,
            userName,
            email,
            password,
            phone,
            address,
            role: 'student',
            avatar: 'avatar.webp',
            enrolledCourses: [],
        });

        await user.save();

        // generate Java web token
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
