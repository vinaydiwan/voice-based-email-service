const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    fname : String,
    lname : String,
    email : String,
    epass : String,
    no : Number,
    username : String,
    pass : String,
});

module.exports = mongoose.model("User",userSchema)