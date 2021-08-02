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
route.get("/:id/compose", isLoggedIn, CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    res.render("sendMail", { user })
}))
route.get("/:id/profile", isLoggedIn, CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    res.render("profile", { user })
}))
route.get("/:id/profile/edit", isLoggedIn, CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    res.render("editprofile", { user })
}))
route.post("/:id/profile/edit", isLoggedIn, CatchAsync(async (req, res) => {
    const user = await User.updateOne({ username: req.params.id }, req.body)
    res.redirect(`/dashboard/${username}/profile`)
}))
route.post("/compose/:id", isLoggedIn, CatchAsync(async (req, res) => {
    const user = await User.findOne({ username: req.params.id })
    req.flash("success", "Mail sent successfully")
    await sendmail(user, req.body)
    res.redirect(`/dashboard/${user.username}/compose`)
}))

module.exports = route