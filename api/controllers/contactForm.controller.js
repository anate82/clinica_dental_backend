const send = require('gmail-send')({
  user: 'infotallerbj@gmail.com',
  pass: process.env.EMAIL,
  to: 'infotallerbj@gmail.com',
  subject: 'Contact Us web',
  html: `<!DOCTYPE html>
    <html>
    <head>
    <title>ContactUs</title>
    </head>
    <body>
    <h1>Esto es una prueba</h1>
    <p>texto prueba</p>
    </body>
    </html>`,
})

exports.sendEmail = (req, res) => {
  send({
    html: `<!DOCTYPE html>
        <html>
        <head>
        <title>ContactUs</title>
        </head>
        <body>
            <p>Nombre:${req.body.name}</p>
            <p>Teléfono:${req.body.phone}</p>
            <p>Email:${req.body.email}</p>
            <p>Comentario:${req.body.text}</p>
        </body>
        </html>`,
  })
    .then((request) => {
      res.status(200).json(request)
    })
    .catch((err) => console.log(err))
}
