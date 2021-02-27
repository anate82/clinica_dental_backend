const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
  },
  // doctor: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'doctor',
  // },
  start: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  end: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  intervention: {
    type: String,
    required: true,
    enum: ['Empaste', 'Ortodoncia', 'Endodoncia'],
  },
  piece: {
    type: Number,
  },
  observations: {
    type: String,
  },
  medicines: {
    type: String,
  },
  finished: {
    type: Boolean,
    default: false,
  },
})

const appointmentModel = mongoose.model('appointment', appointmentSchema)

module.exports = appointmentModel
