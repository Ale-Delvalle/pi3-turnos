import styles from './MyAppointments.module.css'
import { useState, useEffect } from 'react'
import Appointment from '../../components/Appointment/Appointment'
import axios from 'axios'
import { useContext } from 'react'
import { UserDataContext } from '../../context/User'
import SinUsuarios from '../../components/SinUsuarios/SinUsuarios'
import { Link } from 'react-router-dom'

const MisTurnos = () => {
    const { user, userAppointments, setUserAppointments } = useContext(UserDataContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/turnosPorUsuario/${user.id}`);
                setUserAppointments(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (user && user.id) {
            fetchData()
        }
    }, [user])

    // Cálculo de estadísticas en tiempo real
    const totalAppointments = userAppointments.length
    const activeAppointments = userAppointments.filter(t => t.status !== 'Cancelled').length
    const cancelledAppointments = userAppointments.filter(t => t.status === 'Cancelled').length

    return (
        <div className={`${styles.dashboardContainer} animate-fade-in-up`}>
            {/* Cabecera del Dashboard */}
            <div className={styles.header}>
                <div className={styles.welcome}>
                    <h2>Mis Turnos Médicos</h2>
                    <p>Bienvenido, <span>{user ? user.userName : 'Usuario'}</span>. Gestiona tus citas médicas aquí.</p>
                </div>
                <Link to="/CrearTurno" className={styles.btnAgendar}>
                    + Agendar Nuevo Turno
                </Link>
            </div>

            {/* Tarjetas de Estadísticas */}
            <div className={styles.statsRow}>
                <div className={styles.statCard}>
                    <span className={styles.statNumber}>{totalAppointments}</span>
                    <span className={styles.statLabel}>Total de Citas</span>
                </div>
                <div className={`${styles.statCard} ${styles.statActive}`}>
                    <span className={styles.statNumber}>{activeAppointments}</span>
                    <span className={styles.statLabel}>Citas Activas</span>
                </div>
                <div className={`${styles.statCard} ${styles.statCancelled}`}>
                    <span className={styles.statNumber}>{cancelledAppointments}</span>
                    <span className={styles.statLabel}>Citas Canceladas</span>
                </div>
            </div>

            {/* Listado de Turnos */}
            <div className={styles.appointmentsSection}>
                <h3 className={styles.sectionTitle}>Próximas Citas y Especialidades</h3>
                {userAppointments.length ? (
                    <div className={styles.appointmentsGrid}>
                        {userAppointments.map((turno) => (
                            <Appointment 
                                key={turno.id}
                                id={turno.id}
                                user={turno.user}
                                date={turno.date}
                                time={turno.time}
                                description={turno.description}
                                status={turno.status}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyStateCard}>
                        <SinUsuarios />
                        <Link to="/CrearTurno" className={styles.btnAgendarEmpty}>
                            Agendar mi primer turno
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MisTurnos