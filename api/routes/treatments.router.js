const router = require('express').Router()

const {
  createTreatment,
  getPatientTreatments,
  getPatientTreatmentsByQuery,
  updateTreatment,
  getFinishedTreatmentByPatient,
} = require('../controllers/treatments.controller')

router.get('/patients/:patientId/', getPatientTreatments)
router.get('/patients/:patientId/search', getPatientTreatmentsByQuery)
router.get('/patients/:patientId/finished', getFinishedTreatmentByPatient)
router.post('/', createTreatment)
router.put('/:treatmentId', updateTreatment)

module.exports = router
