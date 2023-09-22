const express = require("express");
var cors = require("cors");

class Server {

    constructor() {
        this.app = express();
        this.app.serviceLocator = require('../config/service-locator');
        this.port = process.env.PORT || 3000;
        this.fightPath = "/fight";
        this.fightRoutes = require("../../interfaces/routes/fight");
        this.defaultRoutes = require("../../interfaces/routes/default");
        //*Middlewares
        this.middleware();

        //*Rutas de mi aplicación
        this.routes();
    }

    middleware() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.fightPath, this.fightRoutes);
        this.app.use("/", this.defaultRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Corriendo en puerto", this.port);
        });
    }
}

module.exports = Server;
