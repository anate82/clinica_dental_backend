const Patient = require('../models/patients.model')

exports.createPatient = (req, res) => {
  console.log(req.body)
  console.log('entro en el controller')
  if (req.body) {
    console.log('entro en el if')
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
        console.log('then')
        res.status(200).send(patient)
      })
      .catch((err) => res.status(500).json(err))
  }
}

// {
//     "firstName": "Juanito3",
//     "lastName": "Grillo2",
//     "dni":"11222221B",
//     "email": "sjmgruerg@prueba.com",
//     "mobilephone":666112231,
//     "telephone": 928467781,
//     "bloodType": "A+",
//     "observations": "Esta sano"
// }

exports.getPatients = (req, res) => {
  Patient.find()
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
