const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employee',
      required: true,
    },
  ],
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  piece: {
    type: Number,
  },
  observations: {
    type: String,
  },
  medication: {
    type: String,
  },
  finished: {
    type: Boolean,
    default: false,
  },
})

const appointmentModel = mongoose.model('appointment', appointmentSchema)

module.exports = appointmentModel
