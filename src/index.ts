import { createSocketServer } from "./socketServer";

import express from "express";
import http from "http";
import { AppController } from "./controllers/AppController";

const app = express();
const server = http.createServer(app);

const socketServer = createSocketServer(server);
const appController = new AppController(socketServer);

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log(`listening on *:${port}`);
});
