const router = require('express').Router()

const {
  createPatient,
  getPatients,
  getPatientById,
  getPatientsByQuery,
  getTreatmentsByPatientId,
  updatePatient,
} = require('../controllers/patients.controller')

router.get('/', getPatients)
router.get('/search', getPatientsByQuery)
router.get('/:patientId/treatments', getTreatmentsByPatientId)
router.get('/:patientId', getPatientById)

router.post('/', createPatient)
router.put('/:patientId', updatePatient)

module.exports = router
