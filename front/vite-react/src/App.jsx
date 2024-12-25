import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home'
import MisTurnos from './views/MyAppointments'

function App() {
  return (
    <>
    <h1 className={styles.title}>Clínica San Sebastián </h1>
    <Navbar/>
    <Home/>
    <MisTurnos/>
    </>
  )
}

export default App
