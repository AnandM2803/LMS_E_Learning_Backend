const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin.model');

router.post('/signup', async (req, res) => {
    const { firstName, lastName, userName, email, password, phone, address } = req.body;
    console.log('Signup attempt:', req.body);

    try {
        let user = await Admin.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new Admin({
            firstName,
            lastName,
            userName,
            email,
            password,
            phone,
            address,
            role: 'admin',
            avatar: 'avatar.webp',
        });

        await user.save();

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
