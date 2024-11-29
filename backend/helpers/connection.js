import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(3000, () => {
  console.log("Server listening on http://0.0.0.0:3000");
});

export default io;
