import express from "express"
import {Server} from "socket.io"
import http from "node:http"
import cors from 'cors';
import { connectDB } from "./config/db";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors:{origin:"*"}});

app.use(express.json());
app.use(cors());

app.use("/room",roomRoutes);

io.on("connection",(socket)=>{
    socket.on("join",name=>{
       socket.username = name;
       io.emit("message",`[${name}] joined the chat`);
    });
    socket.on("chat message",msg=>{
        io.emit("message",`[${socket.username}]: ${msg}`);
    });
    socket.on('disconnect', () => {
    io.emit('message', `[${socket.username}] left the chat`);
  });
});

server.listen(3000,()=>{
    console.log("server running on http://localhost:3000");
    connectDB();
})