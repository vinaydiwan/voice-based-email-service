if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

// import required packages
const express = require("express")
const app = express()
const path = require("path")
const ejsMate = require("ejs-mate")
const mongoose = require("mongoose")
const AppError = require("../utils/appError")
const dashboardRoutes = require('../routes/dashboardRoutes')
const basicRoutes = require('../routes/basicRoutes')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require("../models/users")
const mongoSanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const MongoStore = require('connect-mongo')

// connecting server to database
//const dbURL = process.env.DB_URL;
const dbURL = process.env.DB_URL
mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected")
});

// tools required to set or use commands
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.engine("ejs", ejsMate)
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())

const secret = process.env.SECRET || "asjbdkdba";
app.use(session({
    name: "_gla",
    secret,
    store: MongoStore.create({
        mongoUrl: dbURL,
        secret,
        touchAfter: 24 * 3600,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        httpOnly: true,
        secure: true,
    }
}))

app.use(flash())
app.use(helmet({
    contentSecurityPolicy: false,
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use('/dashboard', dashboardRoutes)
app.use('/', basicRoutes)

app.use('*', (req, res, next) => {
    next(new AppError("Page Not Found!", 404))
})
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went Wrong!" } = err
    return res.render("error", { err })
})
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("server on port ", port)
})
