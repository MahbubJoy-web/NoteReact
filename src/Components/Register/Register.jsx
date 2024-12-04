import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast } from 'react-toastify';

const Register = () => {
  // ==============FireBase==============//
  const auth = getAuth();



  // ---------Common usesate----------------//
  const [Show , setShow] = useState(false)
  const [Data , SetData]= useState({Name: '' , Email: '' , Password: ''}) 
  const[Error, SetError]= useState({NameError: '' ,EmailError: '' , PasswordError: ''})

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
        // ----------Success Notify
        toast.success('Register Success!', {
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
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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


  return (
    <>
      <div className="flex justify-center items-center h-full w-full">
  <div className="grid gap-8">
    <section className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-[-5=px_20px_30px_#2A3335]">
      <div className="border-8 border-transparent rounded-xl bg-white dark:bg-gray-900 shadow-xl p-8 m-2 w-[400px] ">
        <h1 className="text-5xl font-bold text-center cursor-default dark:text-gray-300 text-gray-900 mb-[40px]">Sign Up</h1>
        <form className="flex flex-col gap-4">
          {/* =============User Name */}
          <div>
            <label htmlFor='name' className="block  text-lg dark:text-gray-300">Name :</label>
            <input onChange={(item)=>{SetData((prev)=>({...prev , Name:item.target.value})) , SetError((prev)=>({...prev,NameError:''}))}}  className="border py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" id='name' type="email" placeholder="Name"/>
            <p className='text-[12px] text-[#FF2929] font-medium'>{Error.NameError}</p>
          </div>
          {/* ===============User Email */}
          <div>
            <label htmlFor='Email' className="block text-lg dark:text-gray-300">Email:</label>
            <input onChange={(e)=>{SetData((prev)=>({...prev , Email:e.target.value})) , SetError((prev)=>({...prev,EmailError:''}))}} className="border py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" id='Email' type="email" placeholder="Email"/>
            <p className='text-[12px] text-[#FF2929] font-medium'>{Error.EmailError}</p>
          </div>
          {/* ===============User Pass */}
          <div className='relative'>
            <label htmlFor='Pass' className="block  text-lg dark:text-gray-300">Password:</label >
            <input id='Pass' onChange={(e)=>{SetData((prev)=>({...prev , Password:e.target.value})), SetError((prev)=>({...prev,PasswordError:''}))}}  className="border  py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" type={ Show? "text" : "password" } placeholder="Password"/>
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
          <p>Already have an account?<button className="text-blue-400 transition hover:underline">Login</button ></p>
        </div>
      </div>
    </section>
  </div>
</div>
    </>
  )
}

export default Register