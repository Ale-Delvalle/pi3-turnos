import styles from './Navbar.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext } from '../../context/User'
import { ThemeContext } from '../../context/ThemeContext'

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserDataContext)
    const { theme, toggleTheme } = useContext(ThemeContext)
    const location = useLocation()

    const logoutHandle = () => {
        setIsLoggedIn(false)
    }

    const isActive = (path) => location.pathname === path

    return (
        <header className={`${styles.header} animate-fade-in-up`}>
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
                <button onClick={toggleTheme} className={styles.themeToggleBtn} aria-label="Cambiar tema">
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                    )}
                </button>
            </nav>
        </header>
    )
}

export default Navbar