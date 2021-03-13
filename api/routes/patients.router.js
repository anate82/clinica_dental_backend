const router = require('express').Router()

const {
  createPatient,
  getPatients,
  getPatientById,
  getPatientsByQuery,
  getTreatmentsByPatientId,
  updatePatient,
  addFileToPatient,
  deleteFileFromPatient,
} = require('../controllers/patients.controller')

router.get('/', getPatients)
router.get('/search', getPatientsByQuery)
router.get('/:patientId/treatments', getTreatmentsByPatientId)
router.get('/:patientId', getPatientById)

router.post('/', createPatient)
router.post('/:patientId/files', addFileToPatient)

router.put('/:patientId', updatePatient)

router.delete('/:patientId/files', deleteFileFromPatient)

module.exports = router
