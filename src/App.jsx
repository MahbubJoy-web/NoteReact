import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Register from './Components/Register/Register'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import LayoutOne from './Layout/LayoutOne'
import { Home } from './Components/Pages/Home'
import BinNotes from './Components/Pages/BinNotes'
import PinNote from './Components/Pages/pinNote'

function App() {

  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        < Route path='/' element={<LayoutOne/>} >
        <Route index element={<Home/>}/>
        <Route path='/pinNotes' element={<PinNote/>}/>
        <Route path='/binNote' element={<BinNotes/>}/>
        </Route>
      </Route>
    )
  )
  return (
    <>
   <RouterProvider router={myRoute} />
   <ToastContainer />
    </>
  )
}

export default App
