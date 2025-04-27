import { getDatabase, onValue, push, ref, remove, set, update } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { BiDotsVertical } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const PinNotes = () => {
  // ============redux Data============//
const userID = useSelector((state)=> state.JoyStore.value)

// =============Custom Variables============//
const [delData , takeData] = useState([])
const [showBar , setShowbar] = useState(true)
const [ UniqueCard , SetUniqueCard] = useState('')

// ================Function===============//
const db = getDatabase();

const handleUNpin = (kipler)=>{
  update(ref(db, 'AllNotes/' + kipler.key),{
    pin:false
  })
}
const handleRemove =(monsco)=>{
    // ======Set new Collection=====//
    set(push(ref(db, 'binNotes/')), {
            NotesTitle:monsco.NotesTitle ,
            NotesDis:monsco.NotesDis,
            cardColos : monsco.cardColos,
            UserID : userID.uid, 
            pin:monsco.pin,
          })
    // ======Remove Data=====
    remove(ref(db, 'AllNotes/' + monsco.key))  

}

// ===========RealTime Database===========//
useEffect(() =>{
  onValue(ref(db, 'AllNotes/'), (snapshot) => {
    let Shoot= []
    snapshot.forEach((item)=>{
      if( item.val().UserID == userID.uid && item.val().pin == true){
        Shoot.push({...item.val(), key:item.key})
      }
    })
    takeData(Shoot)
    
  });
},[])

  return (
    
    <>
      <div className=" mt-[30px]  flex gap-3 flex-wrap gap-y-8">
        {
          delData.map((item) =>(
          <div key={item.key} style={{background : item.cardColos}} className='w-[200px] h-[200px] relative border-solid border-[4px] border-gray-200 text-gray-400 p-3'>
            <div className="cardBar absolute top-3 right-[10px]">
            <BsThreeDotsVertical className='w-[20px] h-[20px] cursor-pointer text-black' onClick={()=> {setShowbar(!showBar), SetUniqueCard(item)}} />
              {
                UniqueCard == item && showBar && 
                (
                  <div className='p-2 bg-gray-100 absolute top-full right-0'>
                    <button>Edit</button>
                    <hr />
                    <button onClick={()=>handleUNpin(item)}>Unpin</button>
                    <hr />
                    <button onClick={()=>handleRemove(item)}>Remove</button>
                  </div>
                )
              }

          </div>
            <h2 className='mt-3 text-2xl font-semibold text-black w-[150px] break-words'>{item.NotesTitle}</h2>
            <p className='text-[16px] w-[150px] text-black break-words overflow-hidden'>{item.NotesDis}</p>
          </div>
          ))
        }
      </div>
    </>
  )
}

export default PinNotes
