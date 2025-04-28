import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { use } from 'react'
import { useSelector } from 'react-redux'
import { BiDotsVertical } from "react-icons/bi";
import { IoTrashBin } from "react-icons/io5";
import { FaRecycle } from "react-icons/fa";
import { BsThreeDotsVertical } from 'react-icons/bs';


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

const Alldelete = () => {
  onValue(ref(db, 'binNotes/'), (snapshot) => {
    snapshot.forEach((item) => {
      if (item.val().UserID === userID.uid) {
        remove(ref(db, 'binNotes/' + item.key));
      }
    });
    takeData([]); 
  }, {
    onlyOnce: true 
  });
};

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
     <h2 className='sm:text-3xl text-2xl font-semibold dark:text-white dark:duration-[2s] duration-[2s]'>All Trash</h2>
      <p className='text-gray-500 sm:text-xl text-[12px] dark:text-white'>All your deleted notes will be here</p>
      <div className="flex justify-end gap-2 mr-5">
        <button className='mt-2 sm:w-[90px] w-[65px] bg-red-400 rounded-[40px] sm:text-[16px] text-[12px] font-medium dark:text-white dark:border' onClick={Alldelete}>Delete All</button>
      </div>
      <div className="main">
        <div className=" mt-[30px]  flex gap-3 flex-wrap gap-y-8">
                {
                  delData.map((item) =>(
                  <div key={item.key} style={{background : item.cardColos}} className='sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] relative border-solid border-[4px] border-gray-200 dark:border-white text-gray-400 p-3 overflow-hidden'>
                    <div className="cardBar absolute top-3 right-[10px]">
                    
                    <BsThreeDotsVertical className='w-[20px] h-[20px] cursor-pointer text-black' onClick={()=> {setShowbar(!showBar), SetUniqueCard(item)}} /> 
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
                        <h2 className='mt-4 sm:text-2xl font-semibold text-black sm:w-[150px] break-words'>{item.NotesTitle}</h2>
                        <p className='sm:text-[16px] text-[12px] sm:w-[150px] w-[120px] sm:h-[150px] text-black break-words overflow-hidden'>{item.NotesDis}</p>
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