import Room from "../src/models/room.model"

const RoomMembers = new Map();

export default function (io) {
    io.on("connection", (socket) => {
        socket.on("joinRoom", async (roomId, userName, password) => {
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
                    RoomMembers.get(roomId).add(userName);
                    const members = Array.from(RoomMembers.get(roomId));
                    io.to(roomId).emit("roomMembers", members);
                    socket.emit("success", `Joined room ${room.name}`);
                }
            } catch (error) {
                socket.emit("error", "An error occurred");
            }
        });
        socket.on("sendMessage", (roomId, userName, message) => {
            if (!RoomMembers.has(roomId) || !RoomMembers.get(roomId).has(userName)) {
                socket.emit("error", "You are not a member of this room");
                return;
            }
            io.to(roomId).emit("message", { userName, message });
        });
        socket.on("disconnect", (roomId, userName) => {
            if (RoomMembers.has(roomId) && RoomMembers.get(roomId).has(userName)) {
                RoomMembers.get(roomId).delete(userName);
                if (RoomMembers.get(roomId).size === 0){
                    RoomMembers.delete(roomId);
                }
                socket.leave(roomId);
                const members = Array.from(RoomMembers.get(roomId)|| []);
                io.to(roomId).emit("roomMembers",members);
                socket.emit("success",`left room ${roomId}`)
            }
            else{
                socket.emit("error", "You are not a member of this room");
            }
        });
        
    });
}