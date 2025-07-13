import Room from "../models/room.model.js"

const RoomMembers = new Map();

export default function (io) {
    io.on("connection", (socket) => {
        socket.on("joinRoom", async ({roomId, username, password}) => {
            try {
                const room = await Room.findById(roomId);
                if (!room) {
                    socket.emit("error", "Room not found");
                    return;
                }
                if (room.isPrivate && !password) {
                    socket.emit("error", "Password is requied for private room");
                    return;
                }
                if (room.isPrivate && password) {
                    const isMatch = await room.comparePassword(password);
                    if (!isMatch) {
                        socket.emit("error", "Invalid password");
                        return;
                    }
                    socket.join(roomId);
                    if (!RoomMembers.has(roomId)) {
                        RoomMembers.set(roomId, new Set());
                    }
                    RoomMembers.get(roomId).add(username);
                    const members = Array.from(RoomMembers.get(roomId));
                    console.log(members);
                    socket.emit("success", `Joined room ${room.name}`);
                    io.to(roomId).emit("roomMembers", members);
                }else{
                     socket.join(roomId);
                    if (!RoomMembers.has(roomId)) {
                        RoomMembers.set(roomId, new Set());
                    }
                    RoomMembers.get(roomId).add(username);
                    const members = Array.from(RoomMembers.get(roomId));
                    socket.emit("success", `Joined room ${room.name}`);
                    io.to(roomId).emit("roomMembers", members);
                }
            } catch (error) {
                socket.emit("error", "An error occurred");
                console.log(error);
            }
        });
        socket.on("sendMessage", async ({roomId, username, message , password}) => {
            try {
                if (!RoomMembers.has(roomId) || !RoomMembers.get(roomId).has(username)) {
                socket.emit("error", "You are not a member of this room");
                return;
            }
            const room = await Room.findById(roomId);
            if(room.isPrivate && ! password){
                socket.emit("error", "Password is requied for private room");
                return;
            }
            if(room.isPrivate && password){
                const isMatch = await room.comparePassword(password);
                if (!isMatch) {
                    socket.emit("error", "Invalid password");
                    return;
                }
                io.to(roomId).emit("message", { username, message });
            }
            if(!room.isPrivate){
                io.to(roomId).emit("message", { username, message });
            }
        } catch (error) {
            socket.emit("error", "An error occurred");
            console.log(error);
        }
    });
        socket.on("leave-room", ({roomId, username}) => {
            if (RoomMembers.has(roomId) && RoomMembers.get(roomId).has(username)) {
                RoomMembers.get(roomId).delete(username);
                if (RoomMembers.get(roomId).size === 0){
                    RoomMembers.delete(roomId);
                }
                socket.leave(roomId);
                const members = Array.from(RoomMembers.get(roomId)|| []);
                io.to(roomId).emit("roomMembers",members);
                socket.emit("disconnected",`left room ${roomId}`)
            }
        });
    });
}
