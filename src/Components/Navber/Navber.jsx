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
    <nav className='py-5 sm:px-8 px-5 bg-[#FBB4A5] dark:bg-black dark:border-b-2 dark:border-[#fff]'>
      <div className="container">
        <div className="navHead flex justify-between">
          <div className="logo flex items-center ">
            <img className='sm:w-[95px] sm:h-[80px] w-[60px] h-[50px] border-solid border-[4px] border-[#FB4141] rounded-[50%] p-[2px]' src="https://static.vecteezy.com/system/resources/thumbnails/024/553/853/small_2x/colorful-eagle-head-logo-pop-art-style-eagle-face-sticker-pastel-cute-colors-ai-generated-png.png" alt="" />
            <h1 className='ml-2 sm:ml-4 text-xl sm:text-3xl font-bold dark:text-gray-200'>NoteSpoty</h1>
          </div>
            <div className="profileSec flex justify-end items-center sm:gap-5 gap-2">
              <div className="userSec flex-col flex justify-center items-center ">
                <div className="userPhoto w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-[50%] border-[#D91656] border-2 bg-[#E5E1DA] overflow-visible ">
                  <img src={displayUserData?.photoURL} alt="" />
                </div>
                <div className="userName text-[14px] sm:text-[20px] font-semibold dark:text-white">{displayUserData?.displayName}</div>
              </div>
                <IoMdLogOut onClick={handlogOut} className='w-[20px] h-[20px] sm:w-[40px] sm:h-[30px] text-[#FF2929 ] dark:text-white'/>
            </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navber