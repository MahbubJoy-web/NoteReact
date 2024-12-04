import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Register from './Components/Register/Register'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'

function App() {

  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Register/>} />
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
