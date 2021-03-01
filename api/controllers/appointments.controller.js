const Appointment = require('../models/appointments.model')
const ObjectId = require('mongodb').ObjectId
const {
  findTreatmentId,
  createTreatment,
  deleteAppointmentTreatment,
} = require('./treatments.controller')

exports.createAppointment = (req, res) => {
  Appointment.create({
    patient: ObjectId(req.body.patientId),
    start: req.body.start,
    end: req.body.end,
    piece: req.body.piece,
    observations: req.body.observations,
    medicines: req.body.medicines,
  })
    .then((appointment) => {
      if (req.body.treatmentId) {
        findTreatmentId(req, res, appointment._id)
      } else {
        createTreatment(req, res, appointment._id)
      }
    })
    .catch((err) => res.status(500).json(err))
}

exports.updateAppointment = (req, res) => {
  Appointment.findByIdAndUpdate(req.params.appointmentId, req.body)
    .then((appointment) => {
      res.status(200).send(appointment)
    })
    .catch((err) => console.log(err))
}

exports.deleteAppointment = (req, res) => {
  Appointment.findByIdAndDelete(req.params.appointmentId)
    .then((appointment) => {
      deleteAppointmentTreatment(req, res, appointment._id)
    })
    .catch((err) => console.log(err))
}
