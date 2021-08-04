const nodemailer = require("nodemailer")
const AppError = require("../utils/appError")
module.exports.sendmail = (user, body) => {
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
        if (err) {
            return false;
        }
        else {
            return true;
        }
    })
}