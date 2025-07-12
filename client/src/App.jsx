import { useEffect, useState, useRef } from 'react'
import socket from '../socket/socket';
import './App.css'
import Navbar from '../components/Navbar';
import { FaTools, FaSearch } from "react-icons/fa";
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';
import { ToastContainer, toast } from 'react-toastify';
import { useRoomStore } from '../store/RoomStore';
import { useNavigate } from 'react-router';

const App = () => {
    const navigate = useNavigate();
    const [RoomList, setRoomList] = useState([]);
    const [mode, setMode] = useState(null);
    const { roomId, username, setroomMembers, setusername, reset, setroomId, setRoomName } = useRoomStore();

    useEffect(() => {
        socket.emit("leave-room", { roomId, username });
        reset();
        sessionStorage.clear();
    }, []);

    useEffect(() => {
        async function fetchRooms() {
            const res = await fetch("http://localhost:3000/room/get");
            const data = await res.json();
            setRoomList(data.rooms);
        }
        fetchRooms();
    }, []);

    const handleJoinRoom = (room, password) => {
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
            setMode(null);
            navigate('/chat');
        });
    }

    const SelectMode = () => {
        return (<div className='flex h-120 flex-row w-screen justify-center gap-50 items-center text-3xl '>
            <div className='flex flex-col gap-2 items-center justify-center bg-[#5294FF] h-80 w-80 rounded-xl border-3 shadow-[6px_6px_0px_black] hover:cursor-pointer'>
                <FaTools size={40} />
                Create Room
            </div>
            <div
                onClick={() => setMode('join')}
                className='flex flex-col gap-2 items-center justify-center bg-[#5294FF] h-80 w-80 rounded-xl border-3 shadow-[6px_6px_0px_black] hover:cursor-pointer'>
                <FaSearch size={40} />
                Join Room
            </div>
        </div>);
    }

    const RoomListcomponent = () => {
        return (
            <div className='flex flex-col p-10 min-h-120 items-center justify-start gap-10 w-screen'>
                <h1 className='text-5xl'>Available Rooms</h1>
                <div className='flex flex-wrap w-[80%] gap-15 gap-x-20 justify-center'>
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
            {!mode ? <SelectMode />
                : mode === 'join' ? <RoomListcomponent />
                    : <div></div>
            }
            <Footer />
            <ToastContainer theme='dark' />
        </div>
    </>
    );
}

export default App
