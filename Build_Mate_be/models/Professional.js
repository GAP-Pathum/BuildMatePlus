const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profession: { type: String, required: true },
    linkedin: { type: String },
    weblink: { type: String },
    experience: { type: String, required: true },
    workPlace: { type: String, required: true },
    bio: { type: String, required: true },
    skillLevel: { type: String, required: true },
    jobCost: { type: String, required: true },
    profilePicture: { type: String },
    previousJobFile: { type: String }
});

const Professional = mongoose.models.Professional || mongoose.model('Professional', professionalSchema);

module.exports = Professional;
