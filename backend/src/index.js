import express from "express"
import {Server} from "socket.io"
import http from "node:http"
import cors from 'cors';
import { connectDB } from "./config/db.js";
import socket from "./socket/socket.js";
import roomRoutes from "./routes/room.route.js";
import "dotenv/config"
import job from "./config/cron.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {cors:{
    origin:"*",
    methods:["GET", "POST"],
    credentials:true,
}});

app.use(express.json());
app.use(cors({origin:"*",methods:["GET", "POST"]}));

job.start()

app.use("/room",roomRoutes);
app.get("/", (req,res)=>{
    res.send("Welcome to TermChat API");
})

socket(io);

server.listen(process.env.PORT,()=>{
    console.log("server running");
    connectDB();
    
})