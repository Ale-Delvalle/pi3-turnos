import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import MisTurnos from './views/MyAppointments/MyAppointments'
import Login from './views/Login/Login'
import Register from './views/Register/Register'

function App() {
  return (
    <>
    <h1 className={styles.title}>Clínica San Sebastián </h1>
    {/* <Navbar/>
    <Home/>
    <MisTurnos/> */}
    <div style={{display:'flex'}}>
    <Login/>
    <Register/>
    </div>
    </>
  )
}

export default App
