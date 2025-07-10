import { useEffect, useState, useRef } from 'react'
import socket  from '../socket/socket';
import './App.css'

const App = () => {
    const [name, setName] = useState("");
    const [Message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [joined, setJoined] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleMessage = (msg) => {
            setChat((prev) => [...prev, msg]);
        };

        socket.on("message", handleMessage)

        return () => {
            socket.off("message", handleMessage);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleJoin = () => {
        if (name.trim()) {
            socket.emit("join", name.trim());
            setJoined(true);
        }
    }
    const handleSend = (e) => {
        e.preventDefault();
        if (Message.trim()) {
            socket.emit("chat message", Message.trim());
            setMessage("");
        }
    }

    return (
        <div className='flex h-screen w-screen bg-slate-900 text-green-400 p-4 flex-col '>
            {!joined ? (
                <div className="m-auto w-full max-w-sm text-center">
                    <h1 className="text-xl mb-4">Enter your username</h1>
                    <input
                        className="w-full p-2 bg-gray-800 text-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        onClick={handleJoin}
                        className="mt-4 px-4 py-2 bg-green-600 text-black"
                    >
                        Join Chat
                    </button>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto">
                        {chat.map((msg, i) => (
                            <div key={i} className="whitespace-pre-wrap">{"> " + msg}</div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSend} className="flex mt-2">
                        <input
                            className="flex-1 p-2 bg-gray-800 text-white"
                            value={Message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button type="submit" className="bg-green-600 px-4 text-black">
                            Send
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default App
