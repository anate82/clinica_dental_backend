const router = require('express').Router()

const { sendEmail } = require('../controllers/contactForm.controller')

router.post('/', sendEmail)

module.exports = router
