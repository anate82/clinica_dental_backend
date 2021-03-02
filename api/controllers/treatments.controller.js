const Treatment = require('../models/treatments.model')
const ObjectId = require('mongodb').ObjectId

exports.createTreatment = (req, res, id) => {
  if (req.body) {
    Treatment.create({
      patient: ObjectId(req.body.patientId),
      description: req.body.description,
      finished: req.body.finished,
      intervention: req.body.intervention,
      appointments: [ObjectId(id)],
    })
      .then((treatment) => {
        res.status(200).json(treatment)
      })
      .catch((err) => res.status(500).json(err))
  }
}

exports.findTreatmentId = (req, res, id) => {
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
