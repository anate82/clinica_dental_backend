const Treatment = require('../models/treatments.model')
const ObjectId = require('mongodb').ObjectId
const { addTreatmentToPatient } = require('./patients.controller')

exports.createTreatment = (req, res, appointment) => {
  if (req.body) {
    Treatment.create({
      patient: ObjectId(req.body.patientId),
      intervention: req.body.intervention,
      appointments: [ObjectId(appointment._id)],
      finished: req.body.finished,
    })
      .then((treatment) => {
        console.log(
          'treatment in createtreatment treatment.controller',
          treatment
        )
        addTreatmentToPatient(req, res, appointment, treatment._id)
      })
      .catch((err) => res.status(500).json(err))
  }
}

exports.addApointmentToTreatment = (req, res, id) => {
  Treatment.findOne({ _id: req.body.treatmentId })
    .then((treatment) => {
      treatment.appointments.unshift(ObjectId(id))
      treatment.save(function (err) {
        if (err) return res.status(500).send(err)
        res.status(200).json(treatment)
      })
    })
    .catch((err) => res.status(500).json(err))
}

const deleteTreatment = (req, res, id) => {
  Treatment.findByIdAndDelete(id)
    .then((treatment) => {
      res.status(200).json(treatment)
    })
    .catch((err) => console.log(err))
}

exports.deleteAppointmentTreatment = (req, res, id) => {
  Treatment.findOne({ _id: req.body.treatmentId }).then((treatment) => {
    let idx = treatment.appointments.indexOf(id)
    treatment.appointments.splice(idx, 1)
    treatment.save(function (err) {
      if (err) return res.status(500).send(err)
      if (treatment.appointments.length === 0) {
        deleteTreatment(req, res, treatment._id)
      }
      res.status(200).json(treatment)
    })
  })
}
