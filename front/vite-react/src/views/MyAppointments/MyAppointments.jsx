import styles from './MyAppointments.module.css'
import {useState,useEffect} from 'react'
import Appointment from '../../components/Appointment/Appointment'
import axios from 'axios'

const MisTurnos = () => {
    const [turnos,setTurnos]=useState([])
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/appointments/turnos');
                setTurnos(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[])

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
                    <div style={{color:"white"}}>No tienes ningún turno.</div>
                )
            }
            </div>
    )
}

export default MisTurnos