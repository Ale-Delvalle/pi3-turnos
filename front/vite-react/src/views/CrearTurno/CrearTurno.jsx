import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import axios from 'axios';
import { useContext } from 'react';
import { UserDataContext } from '../../context/User';
import styles from './CrearTurno.module.css'
import { validateAppointment } from '../../helpers/validate';

const CrearTurno = () => {
    const {user}=useContext(UserDataContext)
    const postData = async (formData) => {
        try {
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
        <div className={styles.formContainer}>
        <h1>Agenda un turno:</h1>
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
        <Form>
          <label>Fecha</label>
          <Field type="date" name="date" />
          <ErrorMessage name="date" component="div" />
          
          <label>Hora:</label>
          <Field type="time" name="time"/>
          <ErrorMessage name="time" component="div" />

          <label>Descripción:</label>
          <Field type="text" name="description" />
          <ErrorMessage name="description" component="div" />

          <button type="submit" disabled={isSubmitting||errors.date||errors.time||errors.description}>
            Agendar turno
          </button>
        </Form>
      )}
    </Formik>
        </div>

        
    )

}

export default CrearTurno;