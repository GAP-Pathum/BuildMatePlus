const mongoose = require('mongoose');

// Common User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    birthdayDate: { type: Number, required: true },
    birthdayMonth: { type: Number, required: true },
    birthdayYear: { type: Number, required: true },
    agreeTerms: { type: Boolean, required: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' }
});

// User Type Models
const Client = mongoose.model('Client', userSchema);
const Professional = mongoose.model('Professional', userSchema);
const ServiceSupplier = mongoose.model('ServiceSupplier', userSchema);
const MaterialSupplier = mongoose.model('MaterialSupplier', userSchema);

module.exports = { Client, Professional, ServiceSupplier, MaterialSupplier };
