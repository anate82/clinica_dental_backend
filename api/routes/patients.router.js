const router = require('express').Router()

const {
  createPatient,
  getPatients,
  updatePatient,
  getPatientById,
  getPatientsByQuery,
} = require('../controllers/patients.controller')

router.get('/', getPatients)
router.get('/search', getPatientsByQuery)
router.get('/:patientId', getPatientById)

router.post('/', createPatient)
router.put('/:patientId', updatePatient)

module.exports = router
