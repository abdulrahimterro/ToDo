const express = require("express");
const { Exception } = require("../utils");
module.exports = (app) => {
    // urlencoded parser
    app.use(express.urlencoded({ extended: false }));
    // JSON parser
    app.use(express.json({ limit: "50mb" }));
    // API Router for Mongo
    app.use("/api/mongo", require("./routerMongo"));
    // API Router for MySql
    app.use("/api/MySql", require("./routerMySql"));
    // error handler
    app.use(Exception.handler);
}