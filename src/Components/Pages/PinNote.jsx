import React from 'react'
import PinNotes from '../PinNotes/PinNotes'

const PinNote = () => {
  return (
    <>
    <div className="w-full dark:bg-black dark:text-gray-200 sm:p-8 p-4">
    <h2 className='sm:text-3xl text-2xl font-semibold w-full text-black dark:text-white pb-3 border-b '>All Pin Notes</h2>
     <PinNotes/>
    </div>
    </>
  )
}

export default PinNote