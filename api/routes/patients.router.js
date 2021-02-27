const router = require('express').Router()

const {
  createPatient,
  getPatients,
  updatePatient,
} = require('../controllers/patients.controller')

router.get('/', getPatients)
router.post('/', createPatient)
router.put('/:patientId', updatePatient)

module.exports = router
