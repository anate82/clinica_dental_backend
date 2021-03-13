const router = require('express').Router()

const {
  getEmployees,
  getMe,
  getEmployeesByQuery,
  getemployeeById,
  createEmployee,
  updateEmployeeById,
} = require('../controllers/employees.controller')

const { authUser } = require('../utils/index')

router.get('/', getEmployees)
router.get('/me/:employeeId', authUser, getMe)
router.get('/search', getEmployeesByQuery)
router.get('/:employeeId', getemployeeById)
router.post('/', createEmployee)
router.put('/:employeeId', updateEmployeeById)

module.exports = router
