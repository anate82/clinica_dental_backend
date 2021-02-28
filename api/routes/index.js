const router = require('express').Router()
const patientsRouter = require('./patients.router')
const appointmentRouter = require('./appointments.router')
const authRouter = require('./auth.router')

router.use('/patients', patientsRouter)
router.use('/appointments', appointmentRouter)
router.use('/auth', authRouter)

module.exports = router
