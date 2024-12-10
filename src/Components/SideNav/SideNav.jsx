import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { VscNotebook } from "react-icons/vsc";
import { MdOutlinePushPin } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


const SideNav = () => {
      // ========== state
  const [toggleValue, setToggleValue] = useState(false);
  // ========== saving the mode when user  visitor
  useEffect(() => {
    const savedMode = localStorage.getItem("mode") || "light";
    localStorage.setItem("mode", savedMode);
    document
      .querySelector("html")
      .classList.toggle("dark", savedMode === "dark");
  }, []);
  // ========== changing the mode on toggle
  const handelMode = () => {
    if (localStorage.getItem("mode") == "light") {
      localStorage.setItem("mode", "dark");
      document.querySelector("html").classList.add("dark");
      setToggleValue(!toggleValue);
    } else {
      localStorage.setItem("mode", "light");
      document.querySelector("html").classList.remove("dark");
      setToggleValue(!toggleValue);
    }
  };
  return (
    <>
    <nav className='w-[220px] h-screen bg-[#ECEBDE] dark:bg-black dark:bg-black dark:border-r-2 dark:border-[#fff]'>
        <h1 className='text-3xl font-reguler p-3 mb-[60px] dark:text-gray-200'>All Notes</h1>
        <div className="bars">
            <ul>
                <li className=' flex flex-col gap-3'>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? " w-full py-4 inline-block text-black font-medium text-xl pl-3 bg-[#E195AB] pl-9" : " w-full py-4 inline-block text-black font-medium text-xl pl-3  text-black dark:text-gray-200"
                    }
                    >
                    <div className=' flex items-center gap-4'>
                     <VscNotebook className='w-9 h-8'/> All Notes   
                    </div>
                </NavLink>
                <NavLink
                    to="/pinNotes"
                    className={({ isActive }) => isActive ? " w-full py-4 inline-block text-black font-medium text-xl pl-3 bg-[#E195AB] pl-9" : " w-full py-4 inline-block text-black font-medium text-xl pl-3  text-black dark:text-gray-200"
                    }
                    >
                    <div className=' flex items-center gap-4'>
                     <MdOutlinePushPin  className='w-9 h-8'/> Pin Notes
                    </div>
                </NavLink>
                <NavLink
                    to="/binNote"
                    className={({ isActive }) => isActive ? " w-full py-4 inline-block text-black font-medium text-xl pl-3 bg-[#E195AB] pl-9 dark:text-gray-200" : " w-full py-4 inline-block  text-black font-medium text-xl pl-3  text-black dark:text-gray-200"
                    }
                    >
                    <div className=' flex items-center gap-4'>
                     <RiDeleteBin6Line className='w-9 h-8'/> Bin Notes   
                    </div>
                </NavLink>
                </li>
            </ul>
            <div className="modeButton flex justify-center mt-7">
            {localStorage.getItem("mode") == "light" ? (
          <button
            className="py-1 px-3 bg-black text-xl text-white rounded-sm"
            onClick={handelMode}
          >
            Dark
          </button>
        ) : (
          <button
            className="py-1 px-3 bg-[#E195AB] text-white rounded-sm text-xl "
            onClick={handelMode}
          >
            Light
          </button>
        )}
            </div>
       
        </div>
    </nav>
    </>
  )
}

export default SideNav 