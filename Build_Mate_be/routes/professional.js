const express = require('express');
const router = express.Router();
const multer = require('multer');
const Professional = require('../models/Professional');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/registerProfessional', upload.fields([{ name: 'profilePic' }, { name: 'portfolio' }]), async (req, res) => {
    try {
        const {
            email, firstName, lastName, gender, address, phoneNumber, country,
            birthdayDate, birthdayMonth, birthdayYear, userType, agreeTerms,
            linkedin, phone, location, website
        } = req.body;

        // Validate required fields
        if (!email || !firstName || !lastName || !gender || !address || !phoneNumber ||
            !country || !birthdayDate || !birthdayMonth || !birthdayYear || !userType ||
            !agreeTerms || !linkedin || !phone || !location || !website) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const profilePic = req.files['profilePic'] ? req.files['profilePic'][0].path : null;
        const portfolio = req.files['portfolio'] ? req.files['portfolio'][0].path : null;

        // Create new professional user
        const professional = new Professional({
            email, firstName, lastName, gender, address, phoneNumber, country,
            birthdayDate, birthdayMonth, birthdayYear, userType, agreeTerms,
            linkedin, phone, location, website, profilePic, portfolio
        });

        // Save the professional user to the database
        await professional.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
