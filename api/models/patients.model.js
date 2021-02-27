const mongoose = require('mongoose')
const contactSchema = require('./contact.model').schema

const patientSchema = new mongoose.Schema({
  dateIn: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    default: true,
  },
  firstName: {
    type: String,
    trim: true,
    maxLength: 30,
    required: [true, 'firstName error'],
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 50,
    required: [true, 'lastName error'],
  },
  dni: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{8}[a-zA-Z]$/i.test(v)
      },
      message: (dni) => `${dni.value} is not a valid dni`,
    },
  },
  contact: contactSchema,
  bloodType: {
    type: String,
    enum: ['0-', '0+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    required: [true, 'bloodtype is required'],
  },
  observations: {
    type: String,
  },
})

const patientModel = mongoose.model('patient', patientSchema)
module.exports = patientModel
