const Treatment = require('../models/treatments.model')
const ObjectId = require('mongodb').ObjectId

const { addTreatmentToPatient } = require('./patients.controller')

exports.createTreatment = (req, res) => {
  Treatment.create({
    patient: req.body.patient,
    intervention: req.body.intervention,
    interventionSubtype: req.body.interventionSubtype,
    appointments: [],
  })
    .then((treatment) => {
      console.log('treatment en treatment controller', treatment)
      addTreatmentToPatient(req, res, treatment)
    })
    .catch((err) => res.status(500).json(err))
}

exports.addApointmentToTreatment = (req, res, appointmentId) => {
  Treatment.findOne({ _id: ObjectId(req.body.treatmentId) })
    .then((treatment) => {
      console.log(treatment)
      treatment.appointments.unshift(appointmentId)
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
