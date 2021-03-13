const mongoose = require('mongoose')
const contactSchema = require('./contact.model').schema

const employeeSchema = new mongoose.Schema({
  dateOfEmployment: {
    type: String,
  },
  employed: {
    type: Boolean,
    default: true,
  },
  occupation: {
    type: String,
    enum: ['DOCTOR', 'ASSISTANT'],
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    maxLength: 30,
    required: [true, 'firstName error'],
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 50,
    required: [true, 'lastName error'],
  },
  dni: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{8}[a-zA-Z]$/i.test(v)
      },
      message: (dni) => `${dni.value} is not a valid dni`,
    },
  },
  password: {
    type: String,
    required: true,
    //Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
    // validate: {
    //   validator: function (v) {
    //     return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/i.test(
    //       v
    //     )
    //   },
    //   message: (dni) => `${dni.value} is not a valid dni`,
    // },
  },
  contact: contactSchema,
  color: {
    type: String,
    required: true,
  },
})

const employeeModel = mongoose.model('employee', employeeSchema)
module.exports = employeeModel
