import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  // ---------Common usesate----------------//
  const [Show , setShow] = useState(false)
  const [Data , SetData]= useState({Name: '' , Email: '' , Password: ''}) 
  const[Error, SetError]= useState({NameError: '' ,EmailError: '' , PasswordError: ''})
  
  // ==============FireBase==============//
  const auth = getAuth(); 
  // ============navigate usestate=============//
  const navigate = useNavigate()

  // ============ErrorFun==============//
  const handleSubmit = ()=>{
    if(Data.Name ==''){
      SetError((prev)=>({...prev,NameError:'Please Enter Your Name'}))
    }
    if(Data.Email ==''){
      SetError((prev)=>({...prev,EmailError:'Please Enter An Email'}))
    }
    if(Data.Password ==''){
      SetError((prev)=>({...prev,PasswordError:'Please Create a Password'}))
    }
    else{
      createUserWithEmailAndPassword(auth, Data.Email, Data.Password)
      .then((userCredential) => {
        const user = userCredential.user;
      // =================User Update==============
      updateProfile(auth.currentUser, {
        displayName: Data.Name,
        photoURL: "https://cdn-icons-png.flaticon.com/512/4715/4715330.png"
      }).then(() => {
          // ============Email Varification============
          // sendEmailVerification(auth.currentUser)
          // .then(() => {
            // ------------navigate---------
            navigate('/login')
            // ----------Success Notify-------
            toast.success('Register Seccessfull', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
              });
          // });
      }).catch((error) => {
        // An error occurred
        // ...
      });
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const  errorMessage = error.message;
        // ===========Error notify
        if(errorCode =='auth/email-already-in-use'){
          toast.error('Already exist the email', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
        if(errorCode =='auth/weak-password'){
          toast.error('Create A Strong Password', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
      });
    }
  }
  // =================Enter key=================//
 const handleEnter = (e) => {
  if (e.key ==='Enter'){
    handleSubmit()
  }
 }


  return (
    <>
    <div className="flex justify-center items-center min-h-screen w-full sm:p-0 p-5" style={{backgroundImage: `url('https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg?t=st=1745871964~exp=1745875564~hmac=2da3e90f480bf863701b33808bda3194bd8ee07c972c1788dfd7cfd7e661093d&w=996')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
    <div className="grid gap-8">
    <section className="bg-gradient-to-r from-red-500 to-blue-500 rounded-3xl shadow-[-5=px_20px_30px_#2A3335]">
    <div className="border-8 border-transparent rounded-xl bg-transparent shadow-xl p-8 m-2 w-[290px] sm:w-[400px] mx-auto">
        <h1 className="text-5xl text-3xl font-bold text-center cursor-default text-white text-gray-900 mb-[40px]">Sign Up</h1>
        <form className="flex flex-col gap-4">
          {/* =============User Name */}
          <div>
            <label htmlFor='name' className="block  text-lg text-white">Name :</label>
            <input onChange={(item)=>{SetData((prev)=>({...prev , Name:item.target.value})) , SetError((prev)=>({...prev,NameError:''}))}} onKeyDown={handleEnter} className="border py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" id='name' type="email" placeholder="Name"/>
            <p className='text-[12px] text-[#FF2929] font-medium'>{Error.NameError}</p>
          </div>
          {/* ===============User Email */}
          <div>
            <label htmlFor='Email' className="block text-lg text-white">Email:</label>
            <input onChange={(e)=>{SetData((prev)=>({...prev , Email:e.target.value})) , SetError((prev)=>({...prev,EmailError:''}))}} onKeyDown={handleEnter} className="border py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" id='Email' type="email" placeholder="Email"/>
            <p className='text-[12px] text-[#FF2929] font-medium'>{Error.EmailError}</p>
          </div>
          {/* ===============User Pass */}
          <div className='relative'>
            <label htmlFor='Pass' className="block  text-lg text-white">Password:</label >
            <input id='Pass' onChange={(e)=>{SetData((prev)=>({...prev , Password:e.target.value})), SetError((prev)=>({...prev,PasswordError:''}))}} onKeyDown={handleEnter} className="border  py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" type={ Show? "text" : "password" } placeholder="Password"/>
            <p className='text-[12px] text-[#FF2929] font-medium'>{Error.PasswordError}</p>
            {
              Show?
              <IoEye onClick={()=>setShow(!Show)} className='absolute top-[35%] right-5 text-gray-400'/>
              :
              <IoMdEyeOff onClick={()=>setShow(!Show)} className='absolute top-[35%] right-5 text-gray-400'/>
            }

            <span className='w-full h-[1px] bg-[#fff] inline-block mt-[40px]' ></span>
          </div>
        </form>
          <button onClick={handleSubmit} className="w-full p-3 mt-6 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">Register</button>
        <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
          <p>Already have an account?<Link to={'/login'} className="text-white transition hover:underline">Login</Link></p>
        </div>
      </div>
    </section>
  </div>
</div>
    </>
  )
}

export default Register