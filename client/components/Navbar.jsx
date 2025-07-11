import React from 'react'
import { FaComputer } from "react-icons/fa6";
const Navbar = () => {
    return (
        <div className='fixed p-10 flex flex-row items-center justify-center gap-2 text-3xl font-mono bg-white border-b-4 border-black h-20 w-screen'>
            <FaComputer size={46}/>
            TermChat
        </div>
    )
}

export default Navbar
