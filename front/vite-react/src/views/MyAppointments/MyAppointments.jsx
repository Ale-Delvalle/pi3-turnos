import styles from './MyAppointments.module.css'
import {useState,useEffect} from 'react'
import Appointment from '../../components/Appointment/Appointment'
import axios from 'axios'
import { useContext } from 'react'
import { UserDataContext } from '../../context/User'
import SinUsuarios from '../../components/SinUsuarios/SinUsuarios'

const MisTurnos = () => {
    const [turnos,setTurnos]=useState([])
    const {user,userAppointments,setUserAppointments}=useContext(UserDataContext)
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/users/turnosPorUsuario/${user.id}`);
                setUserAppointments(response.data)
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
                userAppointments.length ? (
                    userAppointments.map((turno) => {
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
                    <SinUsuarios/>
                )
            }
            </div>
    )
}

export default MisTurnos