import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue, update, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';
import { BiDotsVertical } from "react-icons/bi";
import PopUp from '../PopUp/PopUp';
import SingelPopup from '../PopUp/SingelPopup';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Singlecard = () => {
// ============redux Data============//
const userID = useSelector((state)=> state.JoyStore.value)

// =============Custom Variables============//
const [delData , takeData] = useState([])
const [showBar , setShowbar] = useState(true)
const [ UniqueCard , SetUniqueCard] = useState('')
const [showpop, SetShowpop] = useState(false)
const [ EditData , SetEditData] = useState('')
const [visiable , setVisible] = useState(false)

// ================Function===============//
const db = getDatabase();

const handlePin = (kipler)=>{
  update(ref(db, 'AllNotes/' + kipler.key),{
    pin:true
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
      if( item.val().UserID == userID.uid){
        Shoot.push({...item.val(), key:item.key})
      }
    })
    takeData(Shoot)
    
  });
},[])

console.log(EditData);

  return (
    <>
      <div className=" mt-[30px]  flex gap-3 flex-wrap gap-y-8">
        {
          delData.map((item) =>(
          <div key={item.key} 
              style={{background : item.cardColos}}
              onDoubleClick={()=>(setVisible(true), SetEditData(item))}
              className='w-[200px] h-[200px] relative border-solid border-[4px] border-gray-200 dark:border-white text-gray-500 p-3 overflow-hidden dark:bg-black'>
            <div className="cardBar absolute top-3 right-[10px]">
            <BsThreeDotsVertical className='w-[20px] h-[20px] cursor-pointer text-black' onClick={()=> {setShowbar(!showBar), SetUniqueCard(item)}} /> 
              {
                UniqueCard == item && showBar && 
                (
                  <div className='p-2 bg-gray-100 absolute top-full right-0'>
                    <button onClick={()=>(SetShowpop(true),SetEditData(item))}>Edit</button>
                    <hr />
                    <button onClick={()=>handlePin(item)}>Pin</button>
                    <hr />
                    <button onClick={()=>handleRemove(item)}>Remove</button>
                  </div>
                )
              }
            </div>
              <h2 className='mt-3 text-2xl font-semibold text-black w-[150px] break-words'>{item.NotesTitle}</h2>
              <p className='text-[16px] w-[150px]  text-black break-words overflow-hidden'>{item.NotesDis}</p>
            </div>
          ))
        }
      </div>
      <PopUp  showValue={showpop}  popCross={()=>SetShowpop(false)} EditDatavalue={EditData} />
        <SingelPopup Visiable={visiable} hide={()=>setVisible(false)} ShowData={EditData}  />
    </>
  )
}
export default Singlecard
