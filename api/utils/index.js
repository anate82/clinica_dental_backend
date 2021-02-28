const jwt = require('jsonwebtoken')
const Employee = require('../models/employees.model')

// Authenticate Middleware
exports.authUser = (req, res, next) => {
  if (!req.headers.token) {
    res.status(403).json({ error: 'No Token found' })
  } else {
    jwt.verify(req.headers.token, process.env.SECRET, (err, token) => {
      if (err) {
        res.status(403).json({ error: 'Token not valid' })
      }
      Employee.findOne({ 'contact.email': token.email })
        .then((employee) => {
          res.locals.employee = employee
          next()
        })
        .catch((err) => res.json(err))
    })
  }
}

// Return HTTP error with details in JSON
exports.handleError = (err, res) => {
  return res.status(400).json(err)
}
