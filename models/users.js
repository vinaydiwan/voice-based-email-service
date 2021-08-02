const mongoose = require("mongoose")
const Schema = mongoose.Schema
const passportlocalmongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    fname : String,
    lname : String,
    epass : String,
    email : {
        type : String,
        required : true,
        unique : true,
    },
    no : Number,
});
userSchema.plugin(passportlocalmongoose)

module.exports = mongoose.model("User",userSchema)