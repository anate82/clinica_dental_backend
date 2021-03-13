const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'A url is required'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: ['image', 'document'],
    required: [true, 'A file type is required'],
  },
  name: {
    type: String,
    default: 'File',
  },
})

const fileModel = mongoose.model('file', fileSchema)
module.exports = fileModel
