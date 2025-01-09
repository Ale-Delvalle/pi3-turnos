import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext } from '../../context/User'


const Navbar = () => {
    const {isLoggedIn,setIsLoggedIn}=useContext(UserDataContext)

    const logoutHandle = () => {
        setIsLoggedIn(false)
    }

    return (
        <nav className={styles.menu}>
            {isLoggedIn ? (
                <>
            <Link to='/inicio'>
            <p>Inicio</p>
            </Link>

            <Link to='/MisTurnos'>
            <p>Mis Turnos</p>
            </Link>

            <Link to='/CrearTurno'>
            <p>Agendar turno</p>
            </Link>

            <button className={styles.logout} onClick={logoutHandle}>Cerrar sesión.</button>
                </>
            ):(
                <>
            <Link to='/entrar'>
            <p>Entrar</p>
            </Link>

            <Link to='/registro'>
            <p>Registro</p>
            </Link>
                </>
            )
            }

        </nav>
    )
}

export default Navbar