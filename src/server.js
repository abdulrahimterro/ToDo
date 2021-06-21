const express = require("express");
const { port } = require("../config");
const MySqlDB = require("./database/sequelize");
const start = async () => {
    const app = express();
    // App Configuration
    require("./app")(app);
    // DataBase Connection Mongo
    await require("./database/mongoose")();
    // DataBase Connection MySql
    console.log("Connecting to MySql DB");
    await MySqlDB.authenticate();
    console.info("MySql DB IS READY.");
    // synchronize MySql DB
    await MySqlDB.sync().then(() => {
        console.log("the database synchronized successfully");
    });
    // Creating the server
    const httpServer = require("http").createServer(app);

    httpServer.listen(port, () => { console.log("server is running of port " + port) });

};

start().catch((err) => console.error(err));