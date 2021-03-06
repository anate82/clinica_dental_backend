const router = require('express').Router()

const {
  getAppointmentsDate,
  getAppointments,
  getAppointmentsByQuery,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointments.controller')

router.get('/date', getAppointmentsDate)
router.get('/', getAppointments)
router.get('/search', getAppointmentsByQuery)
router.get('/:appointmentId', getAppointmentById)
router.post('/', createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router
