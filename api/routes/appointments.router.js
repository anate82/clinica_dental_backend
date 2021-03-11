const router = require('express').Router()

const {
  createAppointment,
  deleteAppointment,
  getAppointmentsDate,
  getAppointments,
  getAppointmentsByQuery,
  getAppointmentById,
  getAppointmentsByPatient,
  updateAppointment,
} = require('../controllers/appointments.controller')

router.get('/date', getAppointmentsDate)
router.get('/', getAppointments)
router.get('/search', getAppointmentsByQuery)
router.get('/:appointmentId', getAppointmentById)
router.get('/patients/:patientId', getAppointmentsByPatient)
router.post('/', createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router
