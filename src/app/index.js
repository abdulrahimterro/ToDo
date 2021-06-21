const express = require("express");
const { Exception } = require("../utils");
module.exports = (app) => {
    // urlencoded parser
    app.use(express.urlencoded({ extended: false }));
    // JSON parser
    app.use(express.json({ limit: "50mb" }));
    // API Router
    app.use("/api", require("./router"));
    // error handler
    app.use(Exception.handler);
}