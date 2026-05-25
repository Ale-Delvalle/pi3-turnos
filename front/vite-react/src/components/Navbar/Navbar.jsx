import styles from './Navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext } from '../../context/User'

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserDataContext)
    const location = useLocation()

    const logoutHandle = () => {
        setIsLoggedIn(false)
    }

    const isActive = (path) => location.pathname === path

    return (
        <header className={`${styles.header} animate-fade-in-up`}>
            <Link to="/" className={styles.logoContainer}>
                <div className={styles.logo}>
                    <span className={styles.logoDot}></span>
                </div>
            </Link>
            <nav className={styles.navLinks}>
                {isLoggedIn ? (
                    <>
                        <Link 
                            to='/inicio' 
                            className={`${styles.link} ${isActive('/inicio') ? styles.active : ''}`}
                        >
                            Inicio
                        </Link>
                        <Link 
                            to='/MisTurnos' 
                            className={`${styles.link} ${isActive('/MisTurnos') ? styles.active : ''}`}
                        >
                            Mis Turnos
                        </Link>
                        <Link 
                            to='/CrearTurno' 
                            className={`${styles.link} ${isActive('/CrearTurno') ? styles.active : ''}`}
                        >
                            Agendar Turno
                        </Link>
                        <button className={styles.logoutBtn} onClick={logoutHandle}>
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to='/entrar' 
                            className={`${styles.link} ${isActive('/entrar') ? styles.active : ''}`}
                        >
                            Entrar
                        </Link>
                        <Link 
                            to='/registro' 
                            className={`${styles.linkRegister} ${isActive('/registro') ? styles.activeRegister : ''}`}
                        >
                            Registrarse
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Navbar