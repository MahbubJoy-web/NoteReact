import React from 'react'
import { IoMdLogOut } from "react-icons/io";

const Navber = () => {
  return (
    <>
    <nav className='py-5 px-8 bg-[#9ABF80]'>
        <div className="navHead flex justify-end">
            <div className="profileSec flex justify-end items-center gap-8">
                <div className="userPhoto w-[50px] h-[50px] rounded-[50%] border-[#D91656] border-2 bg-[#E5E1DA]"></div>
                <div className="userName">Lorem, ipsum dolor.</div>
                <IoMdLogOut className=' w-[25px] h-[25px] text-[#FF2929]'/>
            </div>
        </div>

    </nav>
    </>
  )
}

export default Navber