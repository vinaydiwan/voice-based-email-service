const nodemailer = require("nodemailer")

const sendmail = function (user, body) {
    return new Promise((res, rej) => {
        let flag = true;
        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: user.email,
                pass: user.epass,
            }
        })
        let mailOptions = {
            from: user.email,
            to: body.to,
            subject: body.subject,
            text: body.text
        }
        transport.sendMail(mailOptions, (err, info) => {
            if (!err) {
                res(true)
            }
            res(false)
        })
    })
}

module.exports = {sendmail};