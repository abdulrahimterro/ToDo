const mongoose = require("mongoose");
const config = require("../../config");
const connect = async () => {
    await mongoose.connect(config.DataBase.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    console.log("connected to database");
}
module.exports = connect