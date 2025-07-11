import express from "express"
import {Server} from "socket.io"
import http from "node:http"
import cors from 'cors';
import { connectDB } from "./config/db.js";
import socket from "./socket/index.js";
import roomRoutes from "./models/room.model.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:"*"}});

app.use(express.json());
app.use(cors());

app.use("/room",roomRoutes);

socket(io);

server.listen(3000,()=>{
    console.log("server running on http://localhost:3000");
    connectDB();
})