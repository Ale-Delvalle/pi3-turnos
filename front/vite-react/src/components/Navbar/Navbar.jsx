import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className={styles.menu}>
            <Link to='/home'>
            <p>Home</p>
            </Link>

            <Link to='/login'>
            <p>Login</p>
            </Link>

            <Link to='/register'>
            <p>Registro</p>
            </Link>

            <Link to='/MisTurnos'>
            <p>Mis Turnos</p>
            </Link>
        </nav>
    )
}

export default Navbar