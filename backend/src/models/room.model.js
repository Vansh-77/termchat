import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const roomSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    isPrivate:{
        type:Boolean,
        required:true,
        default:false,
    },
    password:{
        type:String,
    }
},{timestamps:true});

roomSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const Room = new mongoose.model("Room",roomSchema);
export default Room;