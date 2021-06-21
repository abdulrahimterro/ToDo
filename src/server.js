const express = require("express");
const { port } = require("../config");
const start = async () => {
    const app = express();
    // App Configuration
    require("./app")(app);
    // DataBase Connection
    await require("./database/mongoose")();
    // Creating the server
    const httpServer = require("http").createServer(app);

    httpServer.listen(port, () => { console.log("server is running of port " + port) });

};

start().catch((err) => console.error(err));