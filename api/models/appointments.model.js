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
  pieces: [
    {
      type: Number,
    },
  ],
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
  },
  intervention: {
    type: String,
    required: true,
    enum: [
      'Prótesis híbridas',
      'Prótesis mini híbrida',
      'Prótesis locator',
      'Prótesis fija',
      'Prótesis removible',
      'Ferulas',
      'Limpiezas',
      'Obturaciones',
      'Endodoncia',
      'Cirugía',
      'Ortodoncia',
      'Radiografía',
    ],
  },
})

const appointmentModel = mongoose.model('appointment', appointmentSchema)

module.exports = appointmentModel
