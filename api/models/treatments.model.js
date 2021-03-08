const mongoose = require('mongoose')
const treatmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient',
    required: true,
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
  interventionSubtype: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'appointment',
      required: true,
    },
  ],
  finished: {
    type: Boolean,
    default: false,
  },
  // files: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'patient'
  // }]
  // images: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'patient'
  // }]
})

const treatmentModel = mongoose.model('treatment', treatmentSchema)

module.exports = treatmentModel
