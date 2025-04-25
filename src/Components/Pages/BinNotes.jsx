import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { useSelector } from 'react-redux'
import { BiDotsVertical } from "react-icons/bi";
import { IoTrashBin } from "react-icons/io5";
import { FaRecycle } from "react-icons/fa";


const BinNotes = () => {
// ============redux Data============//
const userID = useSelector((state)=> state.JoyStore.value)

// =============Custom Variables============//
const [delData , takeData] = useState([])
const [showBar , setShowbar] = useState(true)
const [ UniqueCard , SetUniqueCard] = useState('')


// ===========Firebase Variables===========//
const db = getDatabase();

// ================Function===============//

const handleDelete = (mancova)=>{
 remove(ref(db, 'binNotes/' + mancova.key))
}


const handleRecover = (kimpolor)=>{
  set(push(ref(db, 'AllNotes/')), {
          NotesTitle:kimpolor.NotesTitle ,
          NotesDis:kimpolor.NotesDis,
          cardColos :kimpolor. cardColos,
          UserID : userID.uid, 
          pin:kimpolor.pin,
        });
  remove(ref(db, 'binNotes/' + kimpolor.key))
}

const Alldelete = ()=>{
  onValue(ref(db, 'binNotes/'), (snapshot) => {
    snapshot.forEach((item)=>{
      if( item.val().UserID == userID.uid){
        remove(ref(db, 'binNotes/' + item.key))
      }
    })
  })
}

// ==========realTime Database===========//
useEffect(() =>{
  onValue(ref(db, 'binNotes/'), (snapshot) => {
    let Shoot= []
    snapshot.forEach((item)=>{
      if( item.val().UserID == userID.uid){
        Shoot.push({...item.val(), key:item.key})
      }
    })
    takeData(Shoot)
    
  });
},[])



  return (
  <>
    <div className="w-full p-2 dark:bg-[#000]">
     <h2 className='text-3xl font-semibold dark:text-white dark:duration-[2s] duration-[2s]'>All Trash</h2>
      <p className='text-gray-500 dark:text-white'>All your deleted notes will be here</p>
      <div className="flex justify-end gap-2 mr-5">
        <button className='w-[90px] bg-red-400 rounded-[40px] text-[16px] font-medium dark:text-white dark:border' onClick={Alldelete}>Delete All</button>
      </div>
      <div className="main">
        <div className=" mt-[30px]  flex gap-3 flex-wrap gap-y-8">
                {
                  delData.map((item) =>(
                  <div key={item.key} style={{background : item.cardColos}} className='w-[200px] h-[200px] relative border-solid border-[4px] border-gray-200 dark:border-white text-gray-400 p-3 overflow-hidden'>
                    <div className="cardBar absolute top-3 right-[10px]">
                    
                    <BiDotsVertical className='w-[20px] h-[20px] cursor-pointer' onClick={()=> {setShowbar(!showBar), SetUniqueCard(item)}} /> 
                      {
                        UniqueCard == item && showBar && 
                        (
                          <div className='p-2 bg-gray-100 absolute top-full right-0 text-black'>
                            <button onClick={()=>handleDelete(item)}><IoTrashBin /></button>
                            <hr />
                            <button onClick={()=>handleRecover(item)}><FaRecycle/></button>
                          </div>
                        )
                      }
        
                    </div>
                    <h2 className='text-2xl w-[100px]'>{item.NotesTitle}</h2>
                    <p className='text-[18px] w-[100px]'>{item.NotesDis}</p>
                  </div>
                  ))
                }
              </div>
      </div>
    </div>
  </>
  )
}

export default BinNotes