const Patient = require('../models/patients.model')

exports.createPatient = (req, res) => {
  if (req.body) {
    Patient.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dni: req.body.dni,
      contact: {
        email: req.body.email,
        mobilephone: req.body.mobilephone,
        telephone: req.body.telephone,
      },
      bloodType: req.body.bloodType,
      observations: req.body.observations,
    })
      .then((patient) => {
        res.status(200).send(patient)
      })
      .catch((err) => res.status(500).json(err))
  }
}

exports.getPatients = (req, res) => {
  Patient.find()
    .select({
      _id: 1,
      dni: 1,
      firstName: 1,
      lastName: 1,
      'contact.mobilephone': 1,
    })
    .then((patients) => res.status(200).send(patients))
    .catch((err) => res.status(500).json(err))
}

exports.getPatientsByQuery = (req, res) => {
  const { page = 1, limit = 10 } = req.query
  console.log('limit', limit * 1)
  console.log('page', (page - 1) * limit)
  console.log('query')
  Patient.find({
    $or: [
      { firstName: { $regex: req.query.input, $options: 'i' } },
      { lastName: { $regex: req.query.input, $options: 'i' } },
      { dni: { $regex: req.query.input, $options: 'i' } },
      { 'contact.mobilephone': { $regex: req.query.input, $options: 'i' } },
    ],
  })
    // .limit(limit * 1)
    // .skip((page - 1) * limit)
    .select({
      _id: 1,
      dni: 1,
      firstName: 1,
      lastName: 1,
      'contact.mobilephone': 1,
    })
    .then((patients) => {
      const count = patients.length
      console.log('patientssss', patients)
      res.status(200).json({
        patients: patients.slice(
          (page - 1) * limit,
          (page - 1) * limit + limit
        ),
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      })
    })
    .catch((err) => res.status(500).json(err))
}

exports.getPatientById = (req, res) => {
  Patient.findById(req.params.patientId)
    .then((patient) => {
      res.status(200).send(patient)
    })
    .catch((err) => res.status(500).json(err))
}

exports.updatePatient = (req, res) => {
  Patient.findByIdAndUpdate(req.params.patientId, req.body, {
    new: true,
    runValidators: true,
    omitUndefined: true,
  })
    .then((patient) => {
      res.status(200).json(patient)
    })
    .catch((err) => res.status(500).json(err))
}
