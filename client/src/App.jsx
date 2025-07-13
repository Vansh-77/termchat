import { useEffect, useState, useRef, createRef } from 'react'
import socket from '../socket/socket';
import './App.css'
import Navbar from '../components/Navbar';
import { FaTools, FaSearch } from "react-icons/fa";
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';
import { ToastContainer, toast } from 'react-toastify';
import { useRoomStore } from '../store/RoomStore';
import { useNavigate } from 'react-router';
import CreateForm from '../components/CreateForm';


const App = () => {
    const navigate = useNavigate();
    const roomListRef = useRef(null)
    const [RoomList, setRoomList] = useState([]);
    const createRef = useRef(null);
    const { roomId, username, setroomMembers, setusername, reset, setroomId, setRoomName, setpassword } = useRoomStore();

    useEffect(() => {
        socket.emit("leave-room", { roomId, username });
        reset();
        sessionStorage.clear();
    }, []);
    async function fetchRooms() {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/room/get`);
            const data = await res.json();
            setRoomList(data.rooms);
        }
    useEffect(() => {
        fetchRooms();
        console.log(socket.connected);
    }, []);

    const handleJoinRoom = (room,password) => {
        const roomId = room.id;
        if (!username) {
            toast.error("please enter a username");
            return;
        }
        const Private = room.isPrivate;
        if (Private && !password) {
            toast.error("Please enter the password for the private room");
            return;
        }
        console.log("iiii")
        socket.emit('joinRoom', { roomId, username, password });
        socket.once('error', (message) => {
            toast.error(message);
            return;
        })
        socket.once('roomMembers', (members) => {
            setroomMembers(members);
        });
        socket.once('success', (message) => {
            setroomId(roomId);
            setRoomName(room.name);
            setpassword(password);
            navigate('/chat');
        });
    }

    const Buttons = () => {
        return (<div className='flex h-120 flex-col md:flex-row w-screen md:justify-center md:gap-50 gap-10 items-center text-3xl p-10 '>
            <div
                onClick={() => { createRef.current.scrollIntoView({ behavior: "smooth", block: "center" }); }}
                className='flex flex-row md:flex-col gap-2 items-center justify-center bg-[#5294FF] md:h-80 md:w-80 h-30 w-100  rounded-xl border-3 shadow-[6px_6px_0px_black] hover:cursor-pointer'>
                <FaTools size={40} />
                Create Room
            </div>
            <div
                onClick={() => { roomListRef.current.scrollIntoView({ behavior: "smooth",block:"center"}) }}
                className='flex md:flex-col flex-row gap-2 items-center justify-center bg-[#5294FF] md:h-80 md:w-80 h-30 w-100  rounded-xl border-3 shadow-[6px_6px_0px_black] hover:cursor-pointer'>
                <FaSearch size={40} />
                Join Room
            </div>

        </div>);
    }

    const RoomListcomponent = () => {
        return (
            <div className='flex flex-col pt-0 p-10 min-h-120 items-center justify-start gap-10 w-screen'>
                <h1 className='text-5xl'>Available Rooms</h1>
                <div className='flex flex-wrap w-[90%] gap-15 gap-x-20 justify-center'>
                     <div ref={roomListRef} />
                    {RoomList.map((room) => <RoomCard key={room.id} item={room} onJoin={handleJoinRoom} />)}
                </div>
            </div>);
    }
    return (<>
        <Navbar />
        <div className='flex flex-col items-center justify-center font-mono pt-20 bg-sky-100 bg-[linear-gradient(to_right,grey_1px,transparent_1px),linear-gradient(to_bottom,grey_1px,transparent_1px)] bg-[size:4rem_4rem]'>
            <div className='flex items-center h-40'>
                <input
                    type="text"
                    className='outline-0 border-3 rounded-xl w-100 bg-[#5294FF] p-4 text-2xl border-black shadow-[6px_6px_0px_black]'
                    value={username}
                    onChange={(e) => { setusername(e.target.value) }}
                    placeholder='Enter your username'
                />
            </div>
            <Buttons />
            <CreateForm ref={createRef} onsuccess={fetchRooms}/>
            <RoomListcomponent />
            <Footer />
            <ToastContainer theme='dark' />
        </div>
    </>
    );
}

export default App
