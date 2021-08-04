const express = require('express')
const route = express.Router()
const CatchAsync = require("../utils/catchAsync")
const User = require("../models/users")
const { isLoggedIn } = require("../middleware/isLoggedIn")
const { sendmail } = require("../middleware/sendmail")

route.get("/:id", isLoggedIn, CatchAsync(async (req, res, next) => {
    const user = await User.findOne({ username: req.params.id })
    res.render("dashboard", { user })
}))

route.route("/:id/compose")
    .get(isLoggedIn, CatchAsync(async (req, res) => {
        const user = await User.findOne({ username: req.params.id })
        res.render("sendMail", { user })
    }))
    .post(isLoggedIn, CatchAsync(async (req, res) => {
        const user = await User.findOne({ username: req.params.id })
        if (sendmail(user, req.body)) {
            req.flash("success", "Mail sent successfully!")
        }
        else {
            req.flash("error", "Email or Password is incorrect!")
        }
        res.redirect(`/dashboard/${user.username}/compose`)
    }))

route.get("/:id/profile", isLoggedIn, CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    res.render("profile", { user })
}))

route.route("/:id/profile/edit")
    .get(isLoggedIn, CatchAsync(async (req, res) => {
        const user = await User.findOne({ username: req.params.id })
        res.render("editprofile", { user })
    }))
    .post(isLoggedIn, CatchAsync(async (req, res) => {
        const user = await User.updateOne({ username: req.params.id }, req.body)
        res.redirect(`/dashboard/${username}/profile`)
    }))

module.exports = route