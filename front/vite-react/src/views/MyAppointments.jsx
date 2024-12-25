import styles from './MyAppointments.module.css'
import MisTurnosMockData from '../helpers/myAppointments'
import {useState} from 'react'
import Appointment from '../components/Appointment/Appointment'

const MisTurnos = () => {
    const [turnos,setTurnos]=useState(MisTurnosMockData)
    return (
        <div>
            <h1>Mis turnos.</h1>
            {
                turnos.length ? (
                    turnos.map((turno) => {
                        return (
                            <Appointment key={turno.id}
                            user={turno.user}
                            date={turno.date}
                            time={turno.time}
                            description={turno.description}
                            status={turno.status}
                            />
                        )
                    })
                ) : (
                    <div>No tienes ningún turno.</div>
                )
            }
            </div>
    )
}

export default MisTurnos