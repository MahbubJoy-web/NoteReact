import React from 'react'
import PinNotes from '../PinNotes/PinNotes'

const PinNote = () => {
  return (
    <>
    <div className="w-full dark:bg-black dark:text-gray-200 p-8">
    <h2 className='text-3xl font-semibold w-full text-black dark:text-white pb-3 border-b '>All Pin Notes</h2>
     <PinNotes/>
    </div>
    </>
  )
}

export default PinNote