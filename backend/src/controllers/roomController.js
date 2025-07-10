import Room from "../models/room.model"
import bcrypt from "bcryptjs"

export const createRoom = async (req, res) => {
    try {
        const { name, createdBy, isPrivate, password } = req.body;
        
        if (!name) return res.status(400).json({ "message": "Room name is required" });
        if (!createdBy) return res.status(400).json({ "message": "User name is required" });
        if (typeof isPrivate !== 'boolean') return res.status(400).json({ "message": "isPrivate field is required and must be a boolean" });
        if (isPrivate && !password) return res.status(400).json({ "message": "password reqired for private room" });

        const roomName = await Room.findOne({ name });
        if (roomName) return res.status(400).json({ "message": "Room name already exists" });

        let passwordHash = null;

        if (isPrivate && password) {
            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(password, salt);
        }

        const room = new Room({
            name,
            createdBy,
            isPrivate,
            password: passwordHash,
        });

        await room.save();
        return res.status(201).json({
            room: {
                id: room._id,
                name: room.name,
                createdBy: room.createdBy,
                isPrivate: room.isPrivate,
                createdAt: room.createdAt,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" });
    }
}

export const getRooms = async (req , res)=>{
    try {
        const rooms = await Room.find();
        res.status(200).json({
            rooms:rooms.map(room =>{
                return{
                    id:room._id,
                    name:room.name,
                    createdBy:room.createdBy,
                    isPrivate:room.isPrivate,
                    createdAt:room.createdAt,
                }
            })
        })
        
    } catch (error) {
        
    }
}
