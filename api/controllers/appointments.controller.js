const Appointment = require('../models/appointments.model')
const ObjectId = require('mongodb').ObjectId
const {
  addApointmentToTreatment,
  createTreatment,
  deleteAppointmentTreatment,
} = require('./treatments.controller')

const { addAppointmentToEmployee } = require('./employees.controller')

exports.getAppointmentsDate = (req, res) => {
  const today = new Date(Date.now())
  const aMonthAgo = today.setMonth(today.getMonth() - 1)
  Appointment.find({ start: { $gt: aMonthAgo } })
    .populate('employees')
    .select({ patient: 1, employees: 1, start: 1, end: 1, intervention: 1 })
    .then((appointments) => {
      res.status(200).json(appointments)
    })
    .catch((err) => res.status(500).json(err))
}

exports.createAppointment = (req, res) => {
  const employees = req.body.employees.map((employeeId) => ObjectId(employeeId))
  Appointment.create({
    patient: ObjectId(req.body.patient),
    employees: employees,
    start: req.body.start,
    end: req.body.end,
    piece: req.body.piece,
    observations: req.body.observations,
    intervention: req.body.intervention,
  })
    .then((appointment) => {
      if (req.body.treatmentId) {
        addApointmentToTreatment(req, res, appointment._id)
      } else {
        createTreatment(req, res, appointment)
      }
      employees.forEach((employee) => {
        addAppointmentToEmployee(req, res, employee, appointment._id)
      })
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
