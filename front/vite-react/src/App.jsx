import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import MisTurnos from './views/MyAppointments/MyAppointments'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import { Routes, Route } from 'react-router-dom'
import { useContext } from "react";
import { UserDataContext } from './context/User';

function App() {
  const {isLoggedIn}=useContext(UserDataContext)
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={isLoggedIn ? <MisTurnos/>: <Home/>}/>
      <Route path='/home' element={isLoggedIn ? <Home/>: <Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/MisTurnos' element={isLoggedIn ? <MisTurnos/>: <Login/>}/>
    </Routes>
    </>
  )
}

export default App
