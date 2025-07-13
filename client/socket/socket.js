import { io } from "socket.io-client";


const socket = io(import.meta.env.VITE_API_URL,{
    autoConnect:true,
    transports:["websockets"],
    secure:true,
    withCredentials:true,
});

export default socket;