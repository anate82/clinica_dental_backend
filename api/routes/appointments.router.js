const router = require('express').Router()

const {
  createAppointment,
  deleteAppointment,
  getAppointmentsDate,
  getAppointmentById,
  updateAppointment,
} = require('../controllers/appointments.controller')

router.get('/', getAppointmentsDate)
router.get('/:appointmentId', getAppointmentById)
router.post('/', createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router
