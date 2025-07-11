import React from 'react'

const RoomCard = ({item}) => {
    const color = item.isPrivate ? 'bg-orange-600' : 'bg-green-500';
  return (
    <div 
    className='flex flex-col rounded-xl border-2 justify-between border-black shadow-[6px_6px_0px_black] bg-sky-600 p-5 py-6 gap-5'>
        <h2 className='text-4xl'>#{item.name}</h2>
        <div className='flex flex-wrap items-center gap-4'>
            <p className='p-2 rounded-2xl bg-slate-800 text-white text-center border-1 border-black shadow-[2px_2px_0px_black]'>{item.isPrivate ? 'private' : 'public'}</p>
            <p className='p-2 rounded-2xl bg-slate-800 text-white text-center border-1 border-black shadow-[2px_2px_0px_black]'>by:{item.createdBy}</p>
        </div>
        { item.isPrivate &&  <input type='password' className='p-2 rounded-2xl bg-slate-800 text-white text-center border-1 border-black shadow-[2px_2px_0px_black]' placeholder='Enter password'/>}
        <button 
        onClick={()=>{handleJoin(item.id)}}
        className={`${color} p-4 text-2xl w-[80%] m-4 mx-auto hover:cursor-pointer rounded-xl border-black border-2 shadow-[6px_6px_0px_black]`}>Join</button>
    </div>
  )
}

export default RoomCard
