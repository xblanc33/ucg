//Nodemailer
var nodemailer = require('nodemailer')

module.exports.transporter = nodemailer.createTransport({
	host: 'smtp1.dc0.gpaas.net',
	port:'25',
	secure: false,
	ignoreTLS:true/*,
    auth: {
        user: 'webmaster@ucgradignan.fr',
        pass: 'webucg-33170@2017'
    }*/
})

