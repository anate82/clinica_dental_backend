const router = require('express').Router()
const appointmentRouter = require('./appointments.router')
const authRouter = require('./auth.router')
const employeesRouter = require('./employees.router')
const patientsRouter = require('./patients.router')
const treatmentRouter = require('./treatments.router')

router.use('/auth', authRouter)
router.use('/appointments', appointmentRouter)
router.use('/employees', employeesRouter)
router.use('/patients', patientsRouter)
router.use('/treatments', treatmentRouter)

module.exports = router
