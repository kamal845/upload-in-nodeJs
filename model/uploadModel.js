const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
  originalFileName: {
    type: String,
    required: true,
  },
  storedFileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

module.exports = FileUpload;
