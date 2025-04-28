import React, { useState } from 'react'
import { MdOutlineLibraryAdd } from "react-icons/md";
import PopUp from '../PopUp/PopUp';

const Addcard = () => {
    const [show , setShow] = useState( false)





  return (
    <> 
    <div onClick={()=> setShow(true)} className='sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] border-dotted border-[4px] border-black dark:border-gray-200 dark:text-gray-200 text-4xl flex flex-col justify-center items-center'>
    <MdOutlineLibraryAdd />
    <h2 className='text-xl sm:text-4xl'>Add</h2>
    </div>
    {
      <PopUp showValue={show} popCross={()=>setShow(false)}/>
    }
    </>
  )
}

export default Addcard