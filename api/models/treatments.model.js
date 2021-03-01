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
    enum: ['Empaste', 'Ortodoncia', 'Endodoncia'],
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

const treatmentModel = mongoose.model('treatments', treatmentSchema)

module.exports = treatmentModel
