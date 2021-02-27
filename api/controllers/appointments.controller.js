const Appointment = require('../models/appointments.model')
const ObjectId = require('mongodb').ObjectId

exports.createAppointment = (req, res) => {
  Appointment.create({
    patient: ObjectId(req.body.patient),
    start: req.body.start,
    end: req.body.end,
    intervention: req.body.intervention,
    piece: req.body.piece,
    observations: req.body.observations,
    medicines: req.body.medicines,
    finished: req.body.finished,
  })
    .then((appointment) => {
      res.status(200).send(appointment)
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
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((err) => console.log(err))
}
