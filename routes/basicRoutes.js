const express = require('express')
const route = express.Router()
const CatchAsync = require("../utils/catchAsync")
const User = require("../models/users")
const { registrationvalidate } = require("../middleware/registrationSchema")
const { ifLoggedIn } = require("../middleware/ifLoggedIn")
const passport = require('passport')

route.get("/", ifLoggedIn, (req, res) => {
    res.render("home")
})

route.route("/login")
    .get(ifLoggedIn, CatchAsync((req, res) => {
        res.render("login")
    }))
    .post(ifLoggedIn, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), CatchAsync((req, res) => {
        req.flash("success", "Welcome back!")
        const redirectUrl = req.session.returnTo || `/dashboard/${req.user.username}`
        delete req.session.returnTo;
        res.redirect(redirectUrl)
    }))

route.route("/register")
    .get(ifLoggedIn, CatchAsync((req, res, next) => {
        res.render("register")
    }))
    .post(ifLoggedIn, registrationvalidate, CatchAsync(async (req, res, next) => {
        try {
            const { fname, lname, no, email, epass, username, pass } = req.body
            const user = new User({ fname, lname, email, epass, no, username })
            const newUser = await User.register(user, pass)
            req.login(newUser, (err) => {
                if (err) return next(err)
                req.flash("success", "You Have successfully registered.")
                res.redirect(`/dashboard/${req.user.username}`)
            })
        } catch (error) {
            if (error.code === 11000) {
                req.flash("error", "Email already taken!")
            }
            else {
                req.flash("error", "Username already taken")
            }
            res.redirect("/register")
        }
    }))

route.get("/logout", CatchAsync((req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/login")
}))

module.exports = route

