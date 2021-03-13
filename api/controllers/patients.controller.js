const Patient = require('../models/patients.model')
const ObjectId = require('mongodb').ObjectId

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

exports.getPatients = async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const count = await Patient.countDocuments()
  console.log('Number of documents in Patient colletion: ', count)
  Patient.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select({
      _id: 1,
      dni: 1,
      firstName: 1,
      lastName: 1,
      'contact.mobilephone': 1,
    })
    .then((patients) => {
      res.status(200).json({
        patients: patients,
        totalPages: Math.ceil(count / limit),
        page: page,
        totalPatients: count,
      })
    })
    .catch((err) => res.status(500).json(err))
}

exports.getPatientsByQuery = (req, res) => {
  const { page = 1, limit = 10 } = req.query
  Patient.find({
    $or: [
      { firstName: { $regex: req.query.input, $options: 'i' } },
      { lastName: { $regex: req.query.input, $options: 'i' } },
      { dni: { $regex: req.query.input, $options: 'i' } },
      { 'contact.mobilephone': { $regex: req.query.input, $options: 'i' } },
    ],
  })
    .select({
      _id: 1,
      dni: 1,
      firstName: 1,
      lastName: 1,
      'contact.mobilephone': 1,
    })
    .then((patients) => {
      const count = patients.length
      res.status(200).json({
        patients: patients.slice((page - 1) * limit, page * limit),
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalPatients: count,
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

exports.addTreatmentToPatient = (req, res, treatment) => {
  Patient.findById(treatment.patient)
    .then((patient) => {
      patient.treatments.unshift(ObjectId(treatment._id))
      patient.save(function (err) {
        if (err) return res.status(500).send(err)
        res.status(200).json(treatment)
      })
    })
    .catch((err) => res.status(500).json(err))
}

exports.getTreatmentsByPatientId = (req, res) => {
  Patient.findById(req.params.patientId)
    // .populate({
    //   path: 'treatments',
    //   populate: { path: 'appointments' },
    // })
    .populate({
      path: 'treatments',
      populate: {
        path: 'appointments',
        populate: { path: 'employees' },
      },
    })
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

//Files
exports.addFileToPatient = (req, res) => {
  console.log(' entra al back')
  console.log(req.params.patientId)
  const file = {
    url: req.body.url,
    type: req.body.type,
  }

  Patient.findById(req.params.patientId)
    .then((patient) => {
      console.log('file', file)
      console.log('patient', patient)
      patient.files.unshift(file)
      console.log('hola')
      patient.save(function (err) {
        if (err) return res.status(500).send(err)
        res.status(200).json(patient)
      })
    })
    .catch((err) => res.status(500).json(err))
}

exports.deleteFileFromPatient = (req, res) => {
  Patient.findbyId(req.body.patientId).then((patient) => {
    let idx = patient.files.indexOf(req.body.fileId)
    patient.files.splice(idx, 1)
    patient.save(function (err) {
      if (err) return res.status(500).send(err)
      res.status(200).json(patient)
    })
  })
}
