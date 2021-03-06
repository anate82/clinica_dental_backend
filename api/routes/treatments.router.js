const router = require('express').Router()

const { createTreatment } = require('../controllers/treatments.controller')

router.post('/', createTreatment)

module.exports = router
