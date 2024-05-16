import React from 'react'

export default function Layout() {
  return (
    <div>
        <div className='flex items-center justify-center'>
            <div className='absolute top-[90px] bg-white flex w-[68%] h-[80%] rounded-3xl mt-4 overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent'>
                <div className='relative bg-custom-blackGreen h-16 w-full top-0 rounded-3xl flex flex-col items-center justify-center'>
                    <h2 className='text-2xl font-semibold'>Name</h2>
                </div>
            </div>
        </div>
    </div>
  )
}
