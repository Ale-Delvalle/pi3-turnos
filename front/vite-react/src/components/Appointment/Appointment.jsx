import { useContext } from "react";
import styles from "./Appointment.module.css";
import { UserDataContext } from "../../context/User";
import axios from "axios";

const Appointment = ({ id, date, time, user, description, status }) => {
  const { userAppointments, setUserAppointments } = useContext(UserDataContext);

  const isCancelled = status === 'Cancelled' || status === 'Cancelado';

  const cancelHandle = async (event) => {
    event.preventDefault();

    try {
      // Nota: Se asume que el backend correrá en el puerto 3001
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
    <div className={`${styles.appointmentCard} ${isCancelled ? styles.cardCancelled : ''}`}>
      {/* Cabecera del Turno */}
      <div className={styles.cardHeader}>
        <div className={styles.dateTimeGroup}>
          <div className={styles.infoRow}>
            <span className={styles.icon}>📅</span>
            <span className={styles.infoText}>{date}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.icon}>🕒</span>
            <span className={styles.infoText}>{time} hs</span>
          </div>
        </div>
        
        {/* Badge de Estado */}
        <span className={`${styles.statusBadge} ${isCancelled ? styles.statusCancelado : styles.statusActivo}`}>
          <span className={styles.badgeDot}></span>
          {isCancelled ? 'Cancelado' : 'Activo'}
        </span>
      </div>

      {/* Contenido / Descripción */}
      <div className={styles.cardBody}>
        <span className={styles.descLabel}>Motivo de Consulta:</span>
        <p className={styles.description}>{description || "Consulta médica general."}</p>
      </div>

      {/* Acciones */}
      <div className={styles.cardFooter}>
        {!isCancelled ? (
          <button onClick={cancelHandle} className={styles.cancelBtn}>
            Cancelar Cita
          </button>
        ) : (
          <button disabled={true} className={styles.cancelledBtn}>
            Cita Cancelada
          </button>
        )}
      </div>
    </div>
  );
};

export default Appointment;
