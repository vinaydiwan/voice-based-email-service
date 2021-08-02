const express = require('express')
const route = express.Router()
const CatchAsync = require("../utils/catchAsync")
const User = require("../models/users")
const AppError = require("../utils/appError")
const { registrationSchema } = require("../middleware/registrationSchema")

const validate = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        req.flash("error","Incorrect/Invalid creadentials")
        res.redirect("/register")
    }
    else {
        next();
    }
}

route.get("/", (req, res) => {
    res.render("home")
})
route.get("/login", CatchAsync((req, res) => {
    res.render("login")
}))
route.post("/login", validate, CatchAsync(async (req, res, next) => {
    console.log(req.body)
    const u = await new User(req.body)
    u.save();
    req.flash("success","You Have successfully registered.")
    res.redirect("/login")
}))
route.get("/register", CatchAsync((req, res, next) => {
    res.render("register")
}))

module.exports = route

