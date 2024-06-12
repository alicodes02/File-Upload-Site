const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    originalName: String,
    uniqueName: String,
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);