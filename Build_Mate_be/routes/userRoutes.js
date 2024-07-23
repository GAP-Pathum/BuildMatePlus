const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// @route   POST /api/users
// @desc    Create a new user
// @access  Public
router.post('/', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'file', maxCount: 1 }]), async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!req.files['photo'] || !req.files['file']) {
            return res.status(400).json({ message: 'Photo and file are required' });
        }

        const photo = req.files['photo'][0].filename;
        const file = req.files['file'][0].filename;

        const newUser = new User({
            name,
            email,
            photo: `uploads/${photo}`,
            file: `uploads/${file}`
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
