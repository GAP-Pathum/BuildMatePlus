const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    birthdayDate: { type: String, required: true },
    birthdayMonth: { type: String, required: true },
    birthdayYear: { type: String, required: true },
    userType: { type: String, required: true },
    agreeTerms: { type: Boolean, required: true },
    profilePic: { type: String, required: true },
    linkedin: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true },
    portfolio: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Professional', professionalSchema);
