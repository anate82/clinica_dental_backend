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
      addTreatmentToPatient(req, res, treatment)
    })
    .catch((err) => res.status(500).json(err))
}
exports.getFinishedTreatmentByPatient = (req, res) => {
  Treatment.find({ patient: req.params.patientId })
    .populate({
      path: 'appointments',
      options: { sort: '-start' },
      populate: { path: 'employees' },
    })
    .limit(5)
    .then((treatment) => {
      res.status(200).json(treatment)
    })
    .catch((err) => res.status(500).json(err))
}

exports.getPatientTreatments = (req, res) => {
  Treatment.find({ patient: req.params.patientId })
    .populate({
      path: 'appointments',
      populate: { path: 'employees' },
    })
    .then((treatments) => {
      res.status(200).send(treatments)
    })
    .catch((err) => res.status(500).json(err))
}

exports.getPatientTreatmentsByQuery = (req, res) => {
  Treatment.find({
    $and: [
      {
        patient: req.params.patientId,
      },
      {
        $or: [
          { intervention: { $regex: req.query.input, $options: 'i' } },
          // {
          //   'appointments[0].employees[0].firstName': {
          //     $regex: req.query.input,
          //     $options: 'i',
          //   },
          // },
        ],
      },
    ],
  })
    .populate({
      path: 'appointments',
      populate: { path: 'employees' },
    })
    .then((treatments) => {
      res.status(200).send(treatments)
    })
    .catch((err) => res.status(500).json(err))
}

exports.addApointmentToTreatment = (req, res, appointmentId) => {
  Treatment.findOne({ _id: ObjectId(req.body.treatmentId) })
    .then((treatment) => {
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

exports.deleteAppointmentTreatment = (req, res, appointment) => {
  Treatment.findOne({ _id: appointment.treatment }).then((treatment) => {
    let idx = treatment.appointments.indexOf(appointment._id)
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

exports.updateTreatment = (req, res) => {
  Treatment.findByIdAndUpdate(req.params.treatmentId, req.body, {
    new: true,
    runValidators: true,
    omitUndefined: true,
  })
    .then((treatment) => {
      res.status(200).send(treatment)
    })
    .catch((err) => res.status(500).json(err))
}
