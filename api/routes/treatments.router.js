const router = require('express').Router()

const {
  createTreatment,
  updateTreatment,
} = require('../controllers/treatments.controller')

router.post('/', createTreatment)
router.put('/:treatmentId', updateTreatment)

module.exports = router
