const router = require('express').Router()

const {
  getAppointmentsDate,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointments.controller')

router.get('/', getAppointmentsDate)
router.post('/', createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router
