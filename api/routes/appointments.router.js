const router = require('express').Router()

const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointments.controller')

router.post('/', createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router
