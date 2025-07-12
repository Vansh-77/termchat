import React from 'react'
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="flex w-screen bg-white border-t-4 border-black h-20 items-center justify-between px-6 font-mono text-black text-sm">
            <div className='flex gap-3 items-center'>
            <p>Built By</p>
            <a className='flex gap-1 items-center underline' href='https://x.com/vb1vb1vb1' target='_blank'><FaXTwitter/>Oreo</a>
            <p>Version: v1.0.0</p>
            </div>
            <div className="flex gap-4">
                <a
                    href="https://github.com/Vansh-77/termchat"
                    target="_blank"
                    className="underline hover:text-blue-600"
                >
                    GitHub
                </a>
                <a href="" className="underline hover:text-blue-600">
                    Docs
                </a>
            </div>
        </div>
    )
}

export default Footer
