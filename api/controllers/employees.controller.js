const Employee = require('../models/employees.model')

exports.createEmployee = (req, res) => {
  if (req.body) {
    Employee.create({
      //dateOfEmployment y employed se crean default
      occupation: req.body.occupation,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      password: req.body.password,
      contact: {
        email: req.body.email,
        mobilephone: req.body.mobilephone,
        telephone: req.body.telephone,
      },
    })
      .then((employee) => {
        res.status(200).send(employee)
      })
      .catch((err) => res.status(500).json(err))
  }
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
      'contact.mobilephone': 1,
    })
    .then((employees) =>
      res.status(200).json({
        employees: employees.slice((page - 1) * limit, page * limit),
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

exports.updateEmployeeById = (req, res) => {
  Employee.findByIdAndUpdate(req.params.employeeId, req.body, {
    new: true,
    runValidators: true,
    omitUndefined: true,
  })
    .then((employee) => {
      res.status(200).json(employee)
    })
    .catch((err) => res.status(500).json(err))
}
