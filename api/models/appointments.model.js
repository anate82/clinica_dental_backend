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
    type: String,
    required: true,
  },
  end: {
    type: String,
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
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'treatment',
    required: false,
  },
  intervention: {
    type: String,
    required: true,
    enum: ['Empaste', 'Ortodoncia', 'Endodoncia'],
  },
})

const appointmentModel = mongoose.model('appointment', appointmentSchema)

module.exports = appointmentModel
