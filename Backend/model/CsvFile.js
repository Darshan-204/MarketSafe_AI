// This model is for storing CSV file metadata in MongoDB
const mongoose = require('mongoose');

const CsvFileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  originalname: {
    type: String
  }
});

module.exports = mongoose.model('CsvFile', CsvFileSchema);
