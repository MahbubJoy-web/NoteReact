import React, { useState } from 'react'
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userData } from '../../Slice/userSlice';

const Login = () => {
    // ---------Common usesate----------------//
    const [Show , setShow] = useState(false)
    const [Data , SetData]= useState({Email: '' , Password: ''}) 
    const[Error, SetError]= useState({EmailError: '' , PasswordError: ''})
  // ==============FireBase==============//
    const auth = getAuth();
  // --------------Navigate Usestate--------------//
    const navigate = useNavigate()
    // ==================Redux============
    const dispatch = useDispatch()


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
        signInWithEmailAndPassword(auth, Data.Email, Data.Password)
        .then((userCredential) => {
          const user = userCredential.user;
          if(user.emailVerified==true){
            // --------------Navigate to Home-----------
            navigate('/')
            // -----------success Notify---------
            toast.success('Login Success', {
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

              dispatch(userData(user))
              localStorage.setItem('JoyStore' ,JSON.stringify(user))
          }
          else{
            toast.error('Email unverified', {
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
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if(errorCode){
            toast.error('Something went wrong', {
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
    const handleEnter = (e) => {
      if(e.key ==='Enter'){
        handleSubmit()
      }

    }
  return (
    <>
    <div className="flex justify-center items-center min-h-screen w-full sm:p-0 p-5" style={{backgroundImage: `url('https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg?t=st=1745871964~exp=1745875564~hmac=2da3e90f480bf863701b33808bda3194bd8ee07c972c1788dfd7cfd7e661093d&w=996')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="grid gap-8">
        <section className="bg-gradient-to-r from-red-500 to-blue-500 rounded-3xl shadow-lg">
          <div className="border-8 border-transparent rounded-xl bg-transparent dark:bg-gray-900 shadow-xl p-8 m-2 w-[290px] sm:w-[400px] mx-auto">
            <h1 className="sm:text-5xl text-3xl font-bold text-center cursor-default bg-transparent text-white mb-10">Login</h1>
            <form className="flex flex-col gap-4">
              {/* Email Input */}
              <div>
                <label htmlFor='Email' className="block text-lg text-white">Email:</label>
                <input 
                  onChange={(e) => { SetData((prev)=>({...prev, Email:e.target.value})) ; SetError((prev)=>({...prev, EmailError:''})) }}
                  onKeyDown={handleEnter}
                  className="border py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" 
                  id='Email' 
                  type="email" 
                  placeholder="Email" 
                />
                <p className='text-xs text-red-600 font-medium'>{Error.EmailError}</p>
              </div>

              {/* Password Input */}
              <div className="relative">
                <label htmlFor='Pass' className="block text-lg text-white">Password:</label>
                <input 
                  id='Pass' 
                  onChange={(e)=>{ SetData((prev)=>({...prev, Password:e.target.value})) ; SetError((prev)=>({...prev, PasswordError:''})) }}
                  onKeyDown={handleEnter}
                  className="border py-2 px-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300" 
                  type={ Show ? "text" : "password" } 
                  placeholder="Password"
                />
                <p className='text-xs text-red-600 font-medium'>{Error.PasswordError}</p>
                {
                  Show ? 
                  <IoEye onClick={()=>setShow(!Show)} className='absolute top-9 right-5 text-gray-400 cursor-pointer'/>
                  :
                  <IoMdEyeOff onClick={()=>setShow(!Show)} className='absolute top-9 right-5 text-gray-400 cursor-pointer'/>
                }
              </div>
            </form>

            <button 
              onClick={handleSubmit} 
              className="w-full p-3 mt-6 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>

            <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
              <p>Don't have an account? <Link to={'/register'} className='text-white hover:underline'>Register</Link></p>
            </div>

          </div>
        </section>
      </div>
    </div>
  </>
  )
}

export default Login