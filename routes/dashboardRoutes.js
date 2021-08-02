const express = require('express')
const route = express.Router()
const CatchAsync = require("../utils/catchAsync")
const say = require("say")
const User = require("../models/users")
const nodemailer = require("nodemailer")
const AppError = require("../utils/appError")
const {loginSchema} = require("../middleware/loginSchema")

const validate = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        req.flash("error","Invalid Username or Password")
        res.redirect("/login")
    }
    else {
        next();
    }
}

route.get("/:id", CatchAsync(async (req, res, next) => {
    say.speak("You are in dashboard.")
    const user = await User.findOne({ username: req.params.id })
    console.log(user)
    res.render("dashboard", { user })
}))
route.post("/",validate, CatchAsync(async (req, res) => {
    let { username, pass } = req.body
    const u = await User.findOne({ username })
    if (u && u.pass === pass) {
        req.flash("success","Welcome!")
        res.redirect(`/dashboard/${username}`)
    } else {
        req.flash("error","Invalid Username or Password")
        res.redirect("/login")
    }
}))
route.get("/:id/compose", CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    console.log(user)
    res.render("sendMail", { user })
}))
route.get("/:id/profile", CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    console.log(user)
    res.render("profile", { user })
}))
route.get("/:id/profile/edit", CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    console.log(user)
    res.render("editprofile", { user })
}))
route.post("/:id/profile/edit", CatchAsync(async (req, res) => {
    console.log(req.body)
    const { username } = req.body
    const user = await User.updateOne({ username: req.params.id }, req.body)
    console.log(username)
    res.redirect(`/dashboard/${username}/profile`)
}))
route.post("/compose/:id", CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    console.log(user)
    //res.render("sendMail",{user})
    req.flash("success","Mail sent successfully")
    console.log(req.body)
    await sendmail(user, req.body)
    res.redirect(`/dashboard/${user.username}/compose`)
}))
function sendmail(user, body) {
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
            throw new AppError("Username and Password not accepted",400)
        }
        else {
            console.log("sent")
            return;
        }
    })
}
module.exports = route