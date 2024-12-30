const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//register User
const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists'});

        const newUser = new User({ email, password, role});
        await newUser.save(); // save the new user using the .save() from the User schema
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//login User and return JWT
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Invalid credentials '});

        const token = jwt.sign({ userId: user._id },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        ); //create token using user_id (generated by mongoDB) and the secret
        res.json({ token }); //return the token to the client
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get User profile (protected, check authRoutes/authMiddleware)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId); //gets userId from authMiddleware (decoded)
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { register, login, getUserProfile };