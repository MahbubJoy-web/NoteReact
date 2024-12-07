import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Register from './Components/Register/Register'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import LayoutOne from './Layout/LayoutOne'
import { Home } from './Components/Home/Home'

function App() {

  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        < Route path='/' element={<LayoutOne/>} >
        <Route index element={<Home/>}/>
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
