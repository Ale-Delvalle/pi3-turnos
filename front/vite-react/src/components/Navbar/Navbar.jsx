import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext } from '../../context/User'


const Navbar = () => {
    const {isLoggedIn}=useContext(UserDataContext)
    return (
        <nav className={styles.menu}>
            {isLoggedIn ? (
                <>
            <Link to='/home'>
            <p>Home</p>
            </Link>
            <Link to='/MisTurnos'>
            <p>Mis Turnos</p>
            </Link>
                </>
            ):(
                <>
            <Link to='/login'>
            <p>Login</p>
            </Link>

            <Link to='/register'>
            <p>Registro</p>
            </Link>
                </>
            )
            }

        </nav>
    )
}

export default Navbar