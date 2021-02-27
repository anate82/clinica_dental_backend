const router = require('express').Router()
const patientsRouter = require('./patients.router')
const appointmentRouter = require('./appointments.router')

router.use('/patients', patientsRouter)
router.use('/appointments', appointmentRouter)

module.exports = router
