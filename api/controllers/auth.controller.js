const Employee = require('../models/employees.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signUp = (req, res) => {
  if (req.body && req.body.password) {
    const encryptedPasswd = bcrypt.hashSync(req.body.password, 10)
    Employee.create({
      occupation: req.body.occupation,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      password: encryptedPasswd,
      contact: {
        email: req.body.email,
        mobilephone: req.body.mobilephone,
        telephone: req.body.telephone,
      },
    })
      .then((employee) => {
        const data = { email: employee.email, name: employee.firstName }
        const token = jwt.sign(data, process.env.SECRET)

        res.status(200).json({ token: token, ...data })
      })
      .catch((err) => res.status(500).send(err))
  }
}

exports.logIn = (req, res) => {
  Employee.findOne({
    'contact.email': req.body.email,
  })
    .select({
      _id: 1,
      password: 1,
      firstName: 1,
      'contact.email': 1,
    })
    .then((employee) => {
      if (employee) {
        if (bcrypt.compareSync(req.body.password, employee.password)) {
          const data = {
            email: employee.contact.email,
            firstName: employee.firstName,
            employeeId: employee._id,
          }
          const token = jwt.sign(data, process.env.SECRET)
          res.status(200).json({ token: token, ...data })
        } else {
          console.log('estas logeado')
          res.send('passwords do not match')
        }
      } else {
        res.send('employee email not found')
      }
    })
    .catch((err) => res.status(500).send(err))
}
