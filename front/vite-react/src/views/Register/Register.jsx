import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateRegister } from '../../helpers/validate';
import axios from 'axios';
import styles from './Register.module.css'

const Register = () => {
    const postData = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3001/users/newUser', formData)
            if(response.status === 201) {
                alert('Usuario REGISTRADO exitosamente')
            }else{
                alert('El usuario NO se pudo registrar')
            }
        } catch (error) {
            console.log(error)
            alert('El usuario no se pudo loguear')
        }
    }
    return (
        <div className={styles.formContainer}>
        <h1>Registrate en la clínica</h1>
        <Formik
      initialValues={{ email: '', password: '', name:'', birthday:'', nDni:'', userName:''}}
      validate={validateRegister}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        postData(values)
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <label>Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />

          <label>Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />

          <label>Cumpleaños:</label>
          <Field type="date" name="birthday" />
          <ErrorMessage name="birthday" component="div" />

          <label>DNI:</label>
          <Field type="number" name="nDni" />
          <ErrorMessage name="nDni" component="div" />

          <label>Username:</label>
          <Field type="text" name="userName" />
          <ErrorMessage name="userName" component="div" />

          <label>Contraseña:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <label>Repetí la contraseña:</label>
          <Field type="password" name="passwordRepeat" />
          <ErrorMessage name="passwordRepeat" component="div" />


          <button type="submit" disabled={isSubmitting||errors.email||errors.password||errors.birthday}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
        </div>
    )

}

export default Register;