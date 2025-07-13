import React, { useEffect, useRef, useState } from 'react'
import { useRoomStore } from '../store/RoomStore'
import socket from '../socket/socket';
import { replace, useNavigate } from 'react-router';

const Chat = () => {
    const navigate = useNavigate();
    const { roomId, RoomName, roomMembers, username, password, chat, addMessage, setroomMembers, reset } = useRoomStore();
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
            socket.emit("leave-room", { roomId, username });
            reset();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [roomId, username]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    useEffect(() => {

        if (!socket.connected) {
            socket.connect();
        }
        const onConnect = () => {
            if (roomId && username) {
                socket.emit("joinRoom", { roomId, username, password });
            }
        };
        const handlemessage = (message) => {
            const msg = `> ${message.username}: ${message.message}`;
            addMessage(msg);
        }

        const handlemembers = (members) => {
            setroomMembers(members);
        }

        socket.on("roomMembers", handlemembers);
        socket.on("connect", onConnect);
        socket.on('message', handlemessage);

        return () => {
            socket.off("connect", onConnect);
            socket.off('message', handlemessage);
            socket.off("roomMembers", handlemembers);
        }
    }, []);

    const handlesend = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { roomId, username, message, password });
            setMessage('');
        }
    }
    const handleLeave = () => {
        navigate('/', { replace: true });
    }

    return (
        <div className='fixed flex md:flex-row flex-col md:h-screen min-h-screen overflow-auto w-screen bg-black gap-5 text-green-500  font-mono'>
            <div className='md:w-[80%] w-[100%] text-6xl border-2 border-dotted flex flex-col '>
                <div className='border-b-2 border-dotted h-max p-2 flex justify-between items-center'>
                    <p> #{RoomName}</p>
                    <button onClick={handleLeave} className='p-2 text-2xl bg-red-900 rounded-2xl hover:cursor-pointer' >Leave</button>
                </div>
                <div className='flex flex-1 flex-col justify-between overflow-hidden'>
                    <div className='flex flex-col gap-2 overflow-y-auto p-2'>
                        {
                            chat.map((msg, index) => (
                                <div key={index} className='text-xl'>
                                    {msg}
                                </div>
                            ))
                        }
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='flex w-[100%] text-2xl px-2 border-t-2 border-dotted items-center'>
                        <p>{username + " >"}</p>
                        <input
                            value={message}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handlesend();
                                }

                            }}
                            onChange={(e) => { setMessage(e.target.value) }}
                            className='flex-1 outline-0 px-2' placeholder='type your message here...' />
                        <button onClick={handlesend} className='p-2 hover:cursor-pointer'>send</button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2 border-2 border-dotted flex-1 py-2 h-[50%] overflow-y-auto'>
                <div className='px-2 text-3xl'>Users</div>
                <div className='border-t-2 border-dotted'></div>
                <div className='flex flex-col gap-2 px-2 text-xl'>
                    {roomMembers.map((member, index) => (
                        <div key={index}>
                            {index + 1}.
                            {member === username ? ` ${member} (You)` : " " + member}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Chat 
