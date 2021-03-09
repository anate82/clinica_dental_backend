const router = require('express').Router()

const {
  createTreatment,
  getFinishedTreatmentByPatient,
} = require('../controllers/treatments.controller')

router.get('/patients/:patientId', getFinishedTreatmentByPatient)
router.post('/', createTreatment)

module.exports = router
