const router = require('express').Router()

const {
  // getEmployees,
  createEmployee,
  getEmployees,
  getemployeeById,
  updateEmployeeById,
} = require('../controllers/employees.controller')

router.get('/', getEmployees)
router.get('/:employeeId', getemployeeById)

router.post('/', createEmployee)
router.put('/:employeeId', updateEmployeeById)

module.exports = router
