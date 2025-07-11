import { useEffect, useState, useRef } from 'react'
import socket from '../socket/socket';
import './App.css'
import Navbar from '../components/Navbar';
import { FaTools , FaSearch  } from "react-icons/fa";
import Footer from '../components/Footer';

const App = () => {

    const [create, setcreate] = useState(false);
    const [join, setJoin] = useState(false);
    const [username, setusername] = useState('');

    return (<>
       <Navbar/>
        <div className='flex flex-col items-center justify-center font-mono pt-20 bg-sky-100 bg-[linear-gradient(to_right,grey_1px,transparent_1px),linear-gradient(to_bottom,grey_1px,transparent_1px)] bg-[size:4rem_4rem]'>
            <div className='flex items-center h-50'>
                <input
                    type="text"
                    className='outline-0 border-3 rounded-xl w-100 bg-[#5294FF] p-4 text-2xl border-black shadow-[6px_6px_0px_black]'
                    value={username}
                    onChange={(e) => { setusername(e.target.value) }}
                 placeholder='Enter your username'
                 />
            </div>
            {!create && !join ?
                <div className='flex h-100 flex-row w-screen justify-center gap-50 items-center text-3xl'>
                    <div className='flex flex-col gap-2 items-center justify-center bg-[#5294FF] h-80 w-80 rounded-xl border-3 shadow-[6px_6px_0px_black] hover:cursor-pointer'>
                        <FaTools size={40}/>
                       Create Room
                    </div>
                     <div className='flex flex-col gap-2 items-center justify-center bg-[#5294FF] h-80 w-80 rounded-xl border-3 shadow-[6px_6px_0px_black] hover:cursor-pointer'>
                        <FaSearch size={40}/>
                       Join Room
                    </div>
                </div> :
                <div>
                </div>
            }
            <Footer/>
        </div>
        </>
    );
}

export default App
