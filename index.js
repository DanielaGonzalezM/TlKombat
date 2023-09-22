require("dotenv").config();

const Server = require("./src/infrastructure/webserver/server");

const start = async () => {
    try {
        const server = await new Server();
        server.listen();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
