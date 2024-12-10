import { parse } from 'postcss';
import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../../Slice/userSlice';

const Navber = () => {
// =============Redux Data================
  const displayUserData = useSelector ((state)=> state.JoyStore.value)

  // =============Log Out ================
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const handlogOut =() =>{
    navigate('/login')
    localStorage.removeItem('JoyStore')
    dispatch(userData(null))

  }

  return ( 
    <>
    <nav className='py-5 px-8 bg-[#FBB4A5] dark:bg-black dark:border-b-2 dark:border-[#fff]'>
      <div className="container">
        <div className="navHead flex justify-between">
          <div className="logo flex items-center">
            <img className='w-[95px] h-[80px]' src="https://static.vecteezy.com/system/resources/thumbnails/024/553/853/small_2x/colorful-eagle-head-logo-pop-art-style-eagle-face-sticker-pastel-cute-colors-ai-generated-png.png" alt="" />
            <h1 className=' text-3xl font-bold dark:text-gray-200'>NoteSpoty</h1>
          </div>
            <div className="profileSec flex justify-end items-center gap-5">
                <div className="userPhoto w-[70px] h-[70px] rounded-[50%] border-[#D91656] border-2 bg-[#E5E1DA] overflow-visible ">
                  <img src={displayUserData?.photoURL} alt="" />
                </div>
                <div className="userName text-[20px] font-semibold dark:text-white">{displayUserData?.displayName}</div>
                <IoMdLogOut onClick={handlogOut} className=' w-[40px] h-[30px] text-[#FF2929 ] dark:text-white'/>
            </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navber