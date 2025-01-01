import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import MisTurnos from './views/MyAppointments/MyAppointments'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/MisTurnos' element={<MisTurnos/>}/>
    </Routes>
    </>
  )
}

export default App
