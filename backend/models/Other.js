const mongoose = require('mongoose');

const OtherSchema = new mongoose.Schema({
    originalName: String,
    uniqueName: String,
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Other', OtherSchema);