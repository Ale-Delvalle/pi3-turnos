import { useContext, useState } from "react";
import styles from "./Appointment.module.css";
import { UserDataContext } from "../../context/User";
import axios from "axios";

const Appointment = ({ id, date, time, user, description, status }) => {
  const { userAppointments, setUserAppointments } = useContext(UserDataContext);

  const cancelHandle = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/appointments/cancelar/${id}`
      );

      const updatedAppointments = userAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      );

      setUserAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error al cancelar el turno:", error);
    }
  };

  return (
    <>
      <div className={styles.cajaDeTurno}>
        <p>Usuario: {user}</p>
        <h2>Fecha: {date}</h2>
        <h2>Hora: {time}</h2>
        <h2>Descripción: {description}</h2>
        <h2>Status: {status}</h2>
      </div>
      {
        (status!=='Cancelled') ? 
        <>
        <button onClick={cancelHandle}>Cancelar turno</button>
        </>: ( <>
        <button disabled={true}>Cancelar turno</button>
        </>
        )
        
      }
    </>
  );
};

export default Appointment;
