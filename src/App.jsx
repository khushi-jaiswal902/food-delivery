import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FoodProvider } from './context/FoodContext'
const App = () => {

  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar />
        <FoodProvider url={url}>
          <Routes>
            <Route path='/add' element={<Add url={url}/>} />
            <Route path='/list' element={<List url={url}/>} />
            <Route path='/orders' element={<Orders url={url}/>} />
          </Routes>
        </FoodProvider>
      </div>
    </div>
  )
}

export default App
