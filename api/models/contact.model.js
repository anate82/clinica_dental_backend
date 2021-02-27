const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'A valid email is required'],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          v
        )
      },
      message: (email) => `${email.value} is not a valid email!`,
    },
  },
  mobilephone: {
    type: String,
    required: [true, 'a mobilephone is required'],
    validate: {
      validator: function (v) {
        return /^[67][0-9]{8}$/.test(v)
      },
      message: (telephone) => `${telephone.value} is not a valid telephone!`,
    },
  },
  telephone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[9][0-9]{8}$/.test(v)
      },
      message: (telephone) => `${telephone.value} is not a valid telephone!`,
    },
  },
})

const contactModel = mongoose.model('contact', contactSchema)
module.exports = contactModel
