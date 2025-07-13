import React, { useState } from 'react'
import {toast} from "react-toastify"
import { useRoomStore } from '../store/RoomStore';

const CreateForm = ({ref , onsuccess}) => {
    const {username , setusername} = useRoomStore();
    const [RoomName, setRoomName] = useState("");
    const [isPrivate, setisPrivate] = useState(false);
    const [pass, setpass] = useState("");

    const handleCreate = async () => {
        console.log("dddd")
        try {
            const res = await fetch(`http://localhost:3000/room/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:RoomName,
                createdBy:username,
                isPrivate,
                password:pass
            })
        });
        const data = await res.json();
        if(res.ok){
            toast.success("room created successfully");
            onsuccess();
        }
        else{
            throw new Error(data.message);
        }
        } catch (error) {
            toast.error(error.message);  
            console.log(error.message);        
        } 
    }

    return (
        <div className='flex flex-col mb-20 items-center gap-3 p-5 border-4 border-black shadow-[6px_6px_0px_black] bg-[#5294FF] rounded-xl'>
            <h2  className='text-4xl'>Create Room</h2>
            
            <div>
                <p className='text-lg'>Enter Room Name</p>
                <input value={RoomName} onChange={(e)=>{
                    setRoomName(e.target.value)
                }} placeholder='Room Name' className='border-2 w-80 border-black shadow-[4px_4px_0px_black] rounded-xl bg-white p-2 outline-0' />
            </div>
            <div>
                <p className='text-lg'>Enter username</p>
                <input value={username} onChange={(e)=>{
                    setusername(e.target.value)
                }}  placeholder='Username' className='border-2 w-80 border-black shadow-[4px_4px_0px_black] rounded-xl bg-white p-2 outline-0' />
            </div>
            <div ref={ref} />
            <div className='w-[100%]'> 
                <p className='text-lg'>select privacy level</p>
                <div className='flex gap-3 items-center justify-start w-[100%]'>
                    <p onClick={() => setisPrivate(false)} className={`p-2 border-2 rounded-4xl border-black text-white ${isPrivate ? "bg-slate-700 shadow-[2px_2px_0px_black] " : "bg-green-700"}  hover:cursor-pointer`}>Public</p>
                    <p onClick={() => setisPrivate(true)} className={`p-2 border-2 rounded-4xl border-black text-white ${isPrivate ? "bg-red-700" : "bg-slate-700 shadow-[2px_2px_0px_black]"}  hover:cursor-pointer`}>Private</p>
                </div>
            </div>
             { isPrivate &&   <div>
                <p className='text-lg'>Enter Password</p>
                <input value={pass} onChange={(e)=>{
                    setpass(e.target.value)
                }}  placeholder='Password' type="password" className='border-2 w-80 border-black shadow-[4px_4px_0px_black] rounded-xl bg-white p-2 outline-0' />
            </div>}
            <button 
            onClick={handleCreate}
            className='p-2 m-5 bg-white text-black border-2 border-black shadow-[4px_4px_0px_black]  rounded-2xl hover:cursor-pointer'>Create Room</button>
        </div>
    )
}

export default CreateForm;
