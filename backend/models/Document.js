const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    originalName: String,
    uniqueName: String,
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);