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
router.use('/status', status)
router.use('/treatments', treatmentRouter)

function status(req, res) {
  res.status(200).json('Server is running')
}

module.exports = router
