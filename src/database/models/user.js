const mongoose = require("mongoose");
const { rounds } = require("../../../config").bcrypt;
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true, set: pas => bcrypt.hashSync(pas, rounds) },
    email: { type: String, unique: true, required: true },
    dateBirth: Date,
    address: { city: { type: String }, street: { type: String } }
});

module.exports = t = mongoose.model("user", userSchema);