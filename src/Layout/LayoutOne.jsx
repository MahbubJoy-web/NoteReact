import React, { useEffect } from 'react'
import Navber from '../Components/Navber/Navber'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideNav from '../Components/SideNav/SideNav'

const LayoutOne = () => {
  const displayUserData = useSelector ((state)=> state.JoyStore.value)
  const navigate = useNavigate()

 useEffect(()=>{
  if(displayUserData == null){
    navigate('/login')
  }
 },[])



  return (
    <>
    <Navber/>
    <div className='flex '>
    <SideNav/>
    <Outlet/>
    </div>
    
    </>
  )
}

export default LayoutOne

