const router = require('express').Router()

const {
  createTreatment,
  updateTreatment,
  getFinishedTreatmentByPatient,
} = require('../controllers/treatments.controller')

router.get('/patients/:patientId', getFinishedTreatmentByPatient)
router.post('/', createTreatment)
router.put('/:treatmentId', updateTreatment)

module.exports = router
