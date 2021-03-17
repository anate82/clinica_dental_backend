const Employee = require('../models/employees.model')
const bcrypt = require('bcrypt')

exports.createEmployee = (req, res) => {
  if (req.body) {
    const encryptedPasswd = bcrypt.hashSync(req.body.password, 10)
    Employee.create({
      //dateOfEmployment y employed se crean default por ahora
      dateOfEmployment: req.body.dateOfEmployment,
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
      color: req.body.color,
    })
      .then((employee) => {
        res.status(200).send(employee)
      })
      .catch((err) => res.status(500).json(err))
  }
}

exports.getMe = (req, res) => {
  console.log(req.body)
  console.log(res.locals)
  Employee.findById(req.params.employeeId)
    .then((me) => {
      res.status(200).send(me)
    })
    .catch((err) => res.status(500).json(err))
}

exports.getEmployeesByQuery = (req, res) => {
  const { page = 1, limit = 10 } = req.query
  Employee.find({
    $or: [
      { dni: { $regex: req.query.input, $options: 'i' } },
      { firstName: { $regex: req.query.input, $options: 'i' } },
      {
        lastName: { $regex: req.query.input, $options: 'i' },
      },
      { 'contact.mobilephone': { $regex: req.query.input, $options: 'i' } },
    ],
  })
    .then((employees) => {
      console.log('controller', employees)
      const count = employees.length
      res.status(200).json({
        employees: employees.slice((page - 1) * limit, page * limit),
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalEmployees: count,
      })
    })
    .catch((err) => res.status(500).json(err))
}

exports.getEmployees = async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const count = await Employee.countDocuments()
  Employee.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select({
      _id: 1,
      dni: 1,
      firstName: 1,
      lastName: 1,
      occupation: 1,
      employed: 1,
      'contact.mobilephone': 1,
      color: 1,
    })
    .then((employees) =>
      res.status(200).json({
        employees: employees,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        total: count,
      })
    )
    .catch((err) => res.status(500).json(err))
}

exports.getemployeeById = (req, res) => {
  Employee.findById(req.params.employeeId)
    .then((employee) => {
      res.status(200).send(employee)
    })
    .catch((err) => res.status(500).json(err))
}
exports.updatePasswordById = (req, res) => {
  const encryptedPasswd = bcrypt.hashSync(req.body.password, 10)
  Employee.findByIdAndUpdate(
    req.params.employeeId,
    {
      password: encryptedPasswd,
    },
    {
      new: true,
      runValidators: true,
      omitUndefined: true,
    }
  )
    .then((employee) => {
      console.log('update', employee)
      res.status(200).json(employee)
    })
    .catch((err) => res.status(500).json(err))
}

exports.updateEmployeeById = (req, res) => {
  Employee.findByIdAndUpdate(
    req.params.employeeId,
    {
      firstName: req.body.firstName,
      dateOfEmployment: req.body.dateOfEmployment,
      lastName: req.body.lastName,
      occupation: req.body.occupation,
      dni: req.body.dni,
      contact: {
        email: req.body.email,
        mobilephone: req.body.mobilephone,
        telephone: req.body.telephone,
      },
      color: req.body.color,
      employed: req.body.employed,
    },
    {
      new: true,
      runValidators: true,
      omitUndefined: true,
    }
  )
    .then((employee) => {
      console.log('update', employee)
      res.status(200).json(employee)
    })
    .catch((err) => res.status(500).json(err))
}
