const router = require('express').Router()

const {
  getAppointmentsDate,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointments.controller')

router.get('/', getAppointmentsDate)
router.get('/:appointmentId', getAppointmentById)
router.post('/', createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router
