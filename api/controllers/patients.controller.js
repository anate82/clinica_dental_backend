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
