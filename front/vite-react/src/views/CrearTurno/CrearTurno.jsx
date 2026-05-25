import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import { useContext } from 'react';
import { UserDataContext } from '../../context/User';
import styles from './CrearTurno.module.css'
import { validateAppointment } from '../../helpers/validate';
import { Link } from 'react-router-dom';

const CrearTurno = () => {
    const {user}=useContext(UserDataContext)
    const postData = async (formData) => {
        try {
            // Nota: Se asume que el backend correrá en el puerto 3001
            const response = await axios.post('http://localhost:3001/appointments/nuevoTurno', formData)
            console.log(response)
            if(response.status === 201) {
                alert('Turno agendado exitosamente')
            }else{
                alert('El turno no se pudo agendar')
            }
        } catch (error) {
            console.log(error)
            alert('El turno no se pudo agendar')
        }
    }
    return (
        <div className={`${styles.formContainer} animate-fade-in-up`}>
          <div className={styles.formHeader}>
              <h1>Agendar Cita</h1>
              <p>Completa la información para programar tu nuevo turno médico</p>
          </div>
          <Formik
            initialValues={{ userId:user.id, date: '', time: '', description:'', status:'Active'}}
            validate={validateAppointment}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              postData(values)
              setSubmitting(false)
              resetForm()
            }}
          >
            {({ isSubmitting, errors}) => (
              <Form className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Fecha de la Cita</label>
                  <Field type="date" name="date" className={styles.input} />
                  <ErrorMessage name="date" component="span" className={styles.errorSpan} />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Hora de la Cita</label>
                  <Field type="time" name="time" className={styles.input} />
                  <ErrorMessage name="time" component="span" className={styles.errorSpan} />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Motivo o Descripción</label>
                  <Field 
                    type="text" 
                    name="description" 
                    className={styles.input} 
                    placeholder="Ej. Chequeo anual, dolor de garganta, etc." 
                  />
                  <ErrorMessage name="description" component="span" className={styles.errorSpan} />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting||errors.date||errors.time||errors.description}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? 'Agendando...' : 'Confirmar Turno'}
                </button>
              </Form>
            )}
          </Formik>
          
          <div className={styles.formFooter}>
              <Link to="/MisTurnos" className={styles.backLink}>← Volver a Mis Turnos</Link>
          </div>
        </div>
    )

}

export default CrearTurno;