const nodemailer = require("nodemailer")
const mailGun = require("nodemailer-mailgun-transport")

const sendEmail = (fullname, email, company, telephone, message, cb) => {
    
    const auth = {
        auth: {
            api_key: "6b6623a996ebebf9c5d599d75eceb869-443ec20e-bf1c2144",
            domain: "sandboxe84ba533297344e58025e83bb0af0483.mailgun.org"
        }
    }

    // creating a transport
        const transporter = nodemailer.createTransport(mailGun(auth))
        const mailOptions = {
            fullname,
            company,
            from: email,
            telephone,
            to: "enquiries@rhinojonprimemetals.com",
            // thinking of usinf envirnment variables here for all the auth and to
            text: [fullname, email, company, telephone, message]
        }

        
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            // console.log(err)
            cb(err, null)
        }
        else {
            // console.log(data)
            cb(null, data)
        }
    })

}

module.exports = sendEmail

