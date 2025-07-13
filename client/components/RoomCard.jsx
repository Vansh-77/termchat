import React, { useState } from 'react'


const RoomCard = ({ item, onJoin }) => {

  const [pwd, setpwd] = useState('')
  const color = item.isPrivate ? 'bg-orange-600' : 'bg-green-500';

  return (
    <div
      className='flex flex-col h-90 w-80 rounded-xl border-2 justify-between border-black shadow-[6px_6px_0px_black] bg-sky-600 p-5 py-6 gap-5'>
      <h2 className='text-4xl'>#{item.name}</h2>
      <div className='flex flex-wrap items-center gap-4'>
        <p className='p-2 rounded-2xl bg-slate-800 text-white text-center border-1 border-black shadow-[2px_2px_0px_black]'>
          {item.isPrivate ? 'private' : 'public'}</p>
        <p className='p-2 rounded-2xl bg-slate-800 text-white text-center border-1 border-black shadow-[2px_2px_0px_black]'>
          by:{item.createdBy}</p>
      </div>
        <input disabled={item.isPrivate?false:true} type='password' value={pwd} onChange={(e) => {
          setpwd(e.target.value)
        }}
          className={`p-2 rounded-2xl text-white text-center border-1 border-black  ${item.isPrivate?"bg-slate-800 shadow-[2px_2px_0px_black]":"bg-slate-600" } `}
          placeholder={item.isPrivate?'Enter password':"No password required"} />
      <button
        onClick={() => { onJoin(item,pwd) }}
        className={`${color} p-4 text-2xl w-[80%] m-4 mx-auto hover:cursor-pointer rounded-xl border-black border-2 shadow-[6px_6px_0px_black]`}>
          Join</button>
    </div>
  )
}

export default RoomCard
