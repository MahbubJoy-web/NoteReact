import { getDatabase, onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { IoMdColorPalette } from 'react-icons/io'
import { IoCheckmarkDoneSharp, IoColorFill } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

const SingelPopup = ({Visiable ,hide, ShowData}) => {
const [delData , takeData] = useState([])
  const [ toddoData ,SetTodaData]   = useState({todoTittle:'', toddoNote:''})
// ================Function===============//
const db = getDatabase();

// ===========RealTime Database===========//
  useEffect(()=>{
    if(ShowData){
      SetTodaData((prev)=>({
        ...prev, 
        todoTittle:ShowData.NotesTitle, 
        toddoNote:ShowData.NotesDis
      }))

    }
  }, [ShowData])

    useEffect(() => {
      if (ShowData) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      
      return () => {
        document.body.style.overflow = 'auto';
      }
    }, [ShowData]);


  return (
       <>
       <div className={`${Visiable? 'w-full' : 'w-0'} transition-all duration-[.5s] z-[999] h-screen bg-[#00000090] fixed left-0 top-0 flex justify-center items-center`}>
           <button onClick={hide} className=' top-10 right-10 absolute '>
             <RxCross2 className=' w-[30px] h-[30px] text-gray-200'/>
           </button>
           
           {/* ==================Input fild=============== */}
           <div  className={`MInput w-[800px] rounded-lg overflow-hidden px-6 py-7 ${Visiable? 'block' : 'hidden'}`}>
             <label htmlFor="tiile" className='text-2xl ml-2 font-medium text-white'>Title</label>
             <input value={toddoData.todoTittle} readOnly id='tiile' type="text" className=' font-medium mt-4 mb-5 w-full h-[50px] bg-[#ECEBDE] text-[#685752] px-4 text-xl outline-none  rounded-[5px] shadow-[21px_27px_11px_rgb(0,0,0,0.12)]' />
             <label htmlFor="note" className=' font-medium text-2xl ml-2 text-white'>Notes</label>
             <textarea value={toddoData.toddoNote} readOnly id='note' type="text" className='font-medium w-full lg:!h-[450px] h-[200px] bg-[#ECEBDE] text-[#685752] text-xl outline-none mt-2 rounded-[5px] p-3 shadow-[21px_27px_11px_rgb(0,0,0,0.12)]'></textarea>
           </div>
       </div>
       </>
  )
}

export default SingelPopup
