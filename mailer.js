//Nodemailer
var nodemailer = require('nodemailer')

module.exports.transporter = nodemailer.createTransport({
    service: 'GandiMail',
    auth: {
        user: 'webmaster@ucgradignan.fr',
        pass: 'webucg-33170@2017'
    }
})

