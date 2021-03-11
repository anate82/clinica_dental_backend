const router = require('express').Router()

const {
  // getEmployees,
  createEmployee,
  getEmployees,
  getemployeeById,
  getEmployeesByQuery,
  updateEmployeeById,
} = require('../controllers/employees.controller')

router.get('/', getEmployees)
router.get('/search', getEmployeesByQuery)
router.get('/:employeeId', getemployeeById)
router.post('/', createEmployee)
router.put('/:employeeId', updateEmployeeById)

module.exports = router
