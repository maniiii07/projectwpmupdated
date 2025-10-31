const User = require('../models/User');
const Item = require('../models/Item');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Creates the first admin account (one-time use)
exports.createAdmin = async (req, res) => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) {
            return res.status(400).json({ message: 'An admin account already exists.' });
        }

        const { name, email, password, phone } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: 'admin' // Explicitly sets the role
        });

        await newAdmin.save();
        res.status(201).json({ message: '✅ Admin account created successfully.' });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Logs in a user only if they have the 'admin' role
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'Invalid credentials or not an admin' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Gets a list of all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Deletes any item on the platform
exports.deleteAnyItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await item.deleteOne();
        res.json({ message: 'Item removed by admin' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};