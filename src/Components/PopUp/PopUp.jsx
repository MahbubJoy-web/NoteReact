import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoColorFill } from "react-icons/io5";
import { IoMdColorPalette } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const PopUp = ({showValue , popCross}) => {
  // ===========redux =================
  const userID = useSelector((state)=> state.JoyStore.value)

  const [showColor , setColor]      = useState (false)
  const [ toddoData ,SetTodaData]   = useState({todoTittle:'', toddoNote:'', ToddoError:''})

  // ==============RealTIME DataBase==============
  const db = getDatabase(); 
  
  // ==============Colors Function================//
  const [ color , setColors]        = useState ('#E5D9F2')


  // ===============All function===============
  const handleButton = ()=>{
    if(toddoData.todoTittle == ''){
      SetTodaData((prev) =>({...prev , ToddoError:'Please Enter An Tittle'}))
    }
    else if(toddoData.toddoNote == ''){
      SetTodaData((prev) =>({...prev , ToddoError:'Please Enter An Note'}))
    }
    else{
      set(push(ref(db, 'AllNotes/')), {
        NotesTitle:toddoData.todoTittle ,
        NotesDis:toddoData.toddoNote,
        cardColos : color,
        UserID : userID.uid, 
        pin:false,
      });
      popCross()
      SetTodaData((prev) =>({...prev , todoTittle:'', toddoNote:''}))
    }
    
  }
    
  return (
    <>
    <div className={`${showValue? 'w-full' : 'w-0'} transition-all duration-[.5s] z-[999] h-screen bg-[#00000090] fixed left-0 top-0 flex justify-center items-center`}>
        <button onClick={popCross} className=' top-10 right-10 absolute '>
          <RxCross2 className=' w-[30px] h-[30px] text-gray-200'/>
        </button>
        {/* ==================Input fild=============== */}
        <div style={{ background:color}} className={`MInput w-[800px] rounded-lg overflow-hidden px-6 py-7 ${showValue? 'block' : 'hidden'}`}>
          <p className='text-[14px] text-[#DA498D] text-center font-bold'>{toddoData.ToddoError}</p>
          <label htmlFor="tiile" className='text-2xl ml-2 font-medium'>Title</label>
          <input value={toddoData.todoTittle} onChange={(e)=>SetTodaData((prev) => ({...prev, todoTittle:e.target.value}))} id='tiile' type="text" className=' font-medium mt-4 mb-5 w-full h-[40px] bg-[#ECEBDE] text-[#685752] px-4 text-xl outline-none  rounded-[5px]' placeholder='Tittle'/>
          <label htmlFor="note" className=' font-medium text-2xl ml-2 '>Notes</label>
          <textarea value={toddoData.toddoNote} onChange={(e)=>SetTodaData((prev) =>({...prev, toddoNote:e.target.value}))} id='note' type="text" className='font-medium w-full !h-[450px] bg-[#ECEBDE] text-[#685752] text-xl outline-none mt-2 rounded-[5px] p-3' placeholder='Note.........'></textarea>
          {/* =============All colors========== */}
          <div className=" w-full mt-4 flex justify-between">
            <div className="allColos flex gap-1 items-center relative">
              <IoColorFill onClick={()=>setColor(!showColor)}  className=' w-[40px] h-[30px] text-[#F26B0F]'/>
              <div className={`flex gap-2 items-center absolute top-[8px] ${!showColor? 'left-[-150px]' : 'left-[50px]' } transition-all  duration-[.5s]`}>
                <button onClick={()=> setColors('#FB4141')} className="w-[20px] h-[20px] bg-[#FB4141] rounded-full"></button>
                <button onClick={()=>setColors('#4335A7')} className="w-[20px] h-[20px] bg-[#4335A7] rounded-full"></button>
                <button onClick={()=>setColors('#7E5CAD')} className="w-[20px] h-[20px] bg-[#7E5CAD] rounded-full"></button>
                <label htmlFor="color">
                <IoMdColorPalette  className='w-[30px] h-[25px] text-[#E195AB]'/>
                </label>
                <input onChange={(e)=> setColors(e.target.value)} type="color" className=' hidden' id='color'/>
              </div>
            </div>
            {/* ================Button================ */}
            <div className="">
            <button
            onClick={handleButton}
              className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-lg cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:w-[95px] hover:rounded-lg active:translate-x-1 active:translate-y-1"
            >
              <div
                className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:pl-3"
              >
                <IoCheckmarkDoneSharp  className='w-[20px] h-[20px] text-white'/>
              </div>
              <div
                className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >save
              </div>
            </button>
            </div>
          </div>
        </div>

    </div>
    
    </>
  )
}

export default PopUp