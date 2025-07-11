import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="flex w-screen bg-white border-t-4 border-black h-20 mt-40 items-center justify-between px-6 font-mono text-black text-sm">
            <div className='flex gap-3 items-center'>
            <p>Built for devs with</p>
            <FaHeart />
            <p>by TermChat</p>
            </div>
            <div className="flex gap-4">
                <a
                    href="https://github.com/Vansh-77/termchat"
                    target="_blank"
                    className="underline hover:text-blue-600"
                >
                    GitHub
                </a>
                <a href="/docs" className="underline hover:text-blue-600">
                    Docs
                </a>
            </div>
        </div>
    )
}

export default Footer
