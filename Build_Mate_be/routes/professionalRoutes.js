const express = require('express');
const router = express.Router();
const multer = require('multer');
const Professional = require('../models/Professional'); // Ensure this is correct

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/registerProfessionalDetails', upload.fields([{ name: 'profilePicture' }, { name: 'previousJobFile' }]), async (req, res) => {
    try {
        const { email, name, profession, linkedin, weblink, experience, workPlace, bio, skillLevel, jobCost } = req.body;
        const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0].path : null;
        const previousJobFile = req.files['previousJobFile'] ? req.files['previousJobFile'][0].path : null;

        // Check if the email already exists
        let professional = await Professional.findOne({ email });

        if (professional) {
            // Update the existing professional document
            professional.name = name;
            professional.profession = profession;
            professional.linkedin = linkedin;
            professional.weblink = weblink;
            professional.experience = experience;
            professional.workPlace = workPlace;
            professional.bio = bio;
            professional.skillLevel = skillLevel;
            professional.jobCost = jobCost;

            if (profilePicture) {
                professional.profilePicture = profilePicture;
            }

            if (previousJobFile) {
                professional.previousJobFile = previousJobFile;
            }

            await professional.save();
            return res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            // Create a new professional document
            const newProfessional = new Professional({
                email,
                name,
                profession,
                linkedin,
                weblink,
                experience,
                workPlace,
                bio,
                skillLevel,
                jobCost,
                profilePicture,
                previousJobFile
            });

            await newProfessional.save();
            return res.status(201).json({ message: 'Profile created successfully' });
        }
    } catch (error) {
        console.error('Error in /registerProfessionalDetails:', error);
        res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
    }
});

module.exports = router;
