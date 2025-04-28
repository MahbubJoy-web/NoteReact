import React from 'react'
import Addcard from '../AddCard/Addcard'
import Singlecard from '../SingleCard/Singlecard'
import PinNotes from '../PinNotes/PinNotes'

export const Home = () => {
  return (
    <>
    <div className="main sm:p-8 p-4 w-full dark:bg-black">
       <Addcard/>
        <h2 className='text-2xl font-semibold w-full text-gray-400 dark:text-white pb-3 mt-9 border-b '>Pinned Notes</h2>
       <PinNotes/>
       <h2 className='text-2xl font-semibold w-full text-gray-400 dark:text-white mt-9 border-b pb-2'>All Notes</h2>
        <Singlecard/>
    </div>
    </>
  )
}
