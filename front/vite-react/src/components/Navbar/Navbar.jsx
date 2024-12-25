import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.config}>
            
            <span>Inicio</span>
            <span>Turnos</span>
            <span>Médicos</span>
            <span>Contacto</span>
        </div>
    )
}

export default Navbar