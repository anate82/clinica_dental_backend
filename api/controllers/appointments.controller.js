const Appointment = require('../models/appointments.model')
const ObjectId = require('mongodb').ObjectId
const {
  addApointmentToTreatment,
  deleteAppointmentTreatment,
} = require('./treatments.controller')

exports.getAppointmentsDate = (req, res) => {
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
  Appointment.find({ start: { $gt: `${year}-${month}-${day} 00:00` } })
    .populate('employees')
    .select({ patient: 1, employees: 1, start: 1, end: 1, intervention: 1 })
    .then((appointments) => {
      res.status(200).json(appointments)
    })
    .catch((err) => res.status(500).json(err))
}

exports.getAppointments = async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const count = await Appointment.countDocuments()
  console.log('Number of documents in Appointment colletion: ', count)
  Appointment.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate('patient', 'firstName')
    .populate('employees', 'firstName')
    .then((appointments) => {
      res.status(200).json({
        appointments: appointments,
        totalPages: Math.ceil(count / limit),
        page: page,
        totalAppointments: count,
      })
    })
    .catch((err) => res.status(500).json(err))
}

exports.getAppointmentsByQuery = (req, res) => {
  const { page = 1, limit = 10 } = req.query
  Appointment.find({
    $or: [
      { intervention: { $regex: req.query.input, $options: 'i' } },
      { 'patient.firstName': { $regex: req.query.input, $options: 'i' } },
      {
        'employees[0].firstName': { $regex: req.query.input, $options: 'i' },
      },
    ],
  })
    .populate('patient', 'firstName')
    .populate('employees', 'firstName')
    .select({
      _id: 1,
      intervention: 1,
      patient: 1,
      employees: 1,
      start: 1,
    })
    .then((appointments) => {
      const count = appointments.length
      res.status(200).json({
        appointments: appointments.slice((page - 1) * limit, page * limit),
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalAppointments: count,
      })
    })
    .catch((err) => res.status(500).json(err))
}

exports.getAppointmentById = (req, res) => {
  Appointment.findById(req.params.appointmentId)
    .populate('patient')
    .populate('employees')
    .populate('treatment')
    .then((appointment) => {
      res.status(200).send(appointment)
    })
    .catch((err) => res.status(500).json(err))
}
exports.getAppointmentsByPatient = (req, res) => {
  Appointment.find({
    $and: [{ patient: req.params.patientId }, { finished: false }],
  })
    .populate('employees', ['firstName', 'lastName'])
    .then((appointments) => {
      res.status(200).send(appointments)
    })
    .catch((err) => res.status(500).json(err))
}

//Endpoint para cita sobre un tratamiento existente
exports.createAppointment = (req, res) => {
  const employees = req.body.employees.map((employeeId) => ObjectId(employeeId))
  Appointment.create({
    patient: req.body.patient,
    employees: employees,
    start: req.body.start,
    end: req.body.end,
    pieces: req.body.pieces,
    observations: req.body.observations,
    intervention: req.body.intervention,
    treatment: req.body.treatmentId,
  })
    .then((appointment) => {
      addApointmentToTreatment(req, res, appointment._id)
    })
    .catch((err) => res.status(500).json(err))
}

exports.updateAppointment = (req, res) => {
  Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, {
    new: true,
    runValidators: true,
    omitUndefined: true,
  })
    .populate('patient')
    .populate('employees')
    .populate('treatment')
    .then((appointment) => {
      res.status(200).send(appointment)
    })
    .catch((err) => console.log(err))
}

exports.deleteAppointment = (req, res) => {
  Appointment.findByIdAndDelete(req.params.appointmentId)
    .then((appointment) => {
      deleteAppointmentTreatment(req, res, appointment)
    })
    .catch((err) => console.log(err))
}
