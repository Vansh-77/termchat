import { io } from "socket.io-client";
import "dotenv/config"

const socket = io(process.env.API_URL,{
    autoConnect:true,
    transports:["websockets"],
    secure:true,
});
export default socket;