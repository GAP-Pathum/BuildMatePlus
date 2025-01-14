const express = require('express');
const router = express.Router();
const { Client, Professional, ServiceSupplier, MaterialSupplier } = require('../models/userModels');
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'buildmateplus@gmail.com',
        pass: 'wgln wrwl xeiw jsxq'
    }
});

// Function to send welcome emails
async function sendWelcomeEmail(email, firstName, userType) {
    const mailOptions = {
        from: 'buildmateplus@gmail.com',
        to: email,
        subject: `Welcome to BuildMate+ as a ${userType}!`,
        html: `
            <p>Dear ${firstName},</p>
            <p>Welcome to BuildMate+ as a <strong>${userType}</strong>!</p>
            <p>Thank you for joining us. We're here to support your journey.</p>
            <p>Best regards, <br> The BuildMate+ Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Registration Route
router.post('/register', async (req, res) => {
    const { email, firstName, lastName, gender, address, phoneNumber, country, birthdayDate, birthdayMonth, birthdayYear, userType, agreeTerms } = req.body;

    if (!email || !firstName || !userType) {
        return res.status(400).json({ message: "Required fields are missing" });
    }

    try {
        let Model;
        switch (userType) {
            case 'client': Model = Client; break;
            case 'professional': Model = Professional; break;
            case 'service supplier': Model = ServiceSupplier; break;
            case 'material supplier': Model = MaterialSupplier; break;
            default: return res.status(400).json({ message: "Invalid user type" });
        }

        const existingUser = await Model.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered as " + userType });
        }

        const newUser = new Model({ email, firstName, lastName, gender, address, phoneNumber, country, birthdayDate, birthdayMonth, birthdayYear, agreeTerms });
        await newUser.save();

        // Send Welcome Email
        await sendWelcomeEmail(email, firstName, userType);

        res.status(201).json({ message: `${userType} registered successfully`, user: newUser });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch User by Email
router.get('/profile/:email', async (req, res) => {
    const email = req.params.email.toLowerCase(); // Ensure case-insensitive email matching

    try {
        // Fetch user data in parallel
        const [client, professional, serviceSupplier, materialSupplier] = await Promise.all([
            Client.findOne({ email }),
            Professional.findOne({ email }),
            ServiceSupplier.findOne({ email }),
            MaterialSupplier.findOne({ email })
        ]);

        // Check if no user exists
        if (!client && !professional && !serviceSupplier && !materialSupplier) {
            return res.status(404).json({ message: "User not found." });
        }

        // Aggregate user types
        const userType = [];
        if (client) userType.push('Client');
        if (professional) userType.push('Professional');
        if (serviceSupplier) userType.push('Service Supplier');
        if (materialSupplier) userType.push('Material Supplier');

        // Combine data and return the first non-null user
        const user = client || professional || serviceSupplier || materialSupplier;
        res.json({ ...user._doc, userType });
    } catch (error) {
        console.error("Error in /profile/:email route:", error);
        res.status(500).json({ message: "Error fetching user profile. Please try again." });
    }
});


module.exports = router;
