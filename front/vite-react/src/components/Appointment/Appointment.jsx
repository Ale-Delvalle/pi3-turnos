import styles from './Appointment.module.css'
const Appointment = ({id,date,time,user,description,status}) => {
    return (
        <div className={styles.cajaDeTurno}>
            <p>Usuario {user}</p>
            <h2>Fecha:{date}</h2>
            <h2>Hora:{time}</h2>
            <h2>Descripción:{description}</h2>
            <h2>Status:{status}</h2>
        </div>
    )
}

export default Appointment