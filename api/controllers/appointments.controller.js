const Appointment = require('../models/appointments.model')
const ObjectId = require('mongodb').ObjectId
const {
  addApointmentToTreatment,
  createTreatment,
  deleteAppointmentTreatment,
} = require('./treatments.controller')

const { addAppointmentToEmployee } = require('./employees.controller')

exports.getAppointmentsDate = (req, res) => {
  console.log('entro al controlador')
  const today = new Date(Date.now())
  const aMonthAgo = new Date(today)
  aMonthAgo.setDate(today.getDate() - 31)
  const year = aMonthAgo.getFullYear()
  const month = (aMonthAgo.getMonth() + 1).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })
  const day = aMonthAgo.getDate().toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  })
  console.log(`${year}-${month}-${day} 00:00`)
  Appointment.find({ start: { $gt: `${year}-${month}-${day} 00:00` } })
    .populate('employees')
    .select({ patient: 1, employees: 1, start: 1, end: 1, intervention: 1 })
    .then((appointments) => {
      console.log(appointments)
      res.status(200).json(appointments)
    })
    .catch((err) => res.status(500).json(err))
}

exports.getAppointmentById = (req, res) => {
  console.log('entro al controlador')
  Appointment.findById(req.params.appointmentId)
    .then((appointment) => {
      console.log(appointment)
      res.status(200).send(appointment)
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
