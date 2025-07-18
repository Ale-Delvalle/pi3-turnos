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

const userExist = async (userName) => {
  try {
    const response = await axios.post('http://localhost:3001/users/userExist', { userName });
    console.log(`El objeto de userExist: ${response.data[0].userExist}`)
    return response.status === 200 && response.data[0].userExist === true;
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    return false;
  }
};


  const [isUserAvailable, setIsUserAvailable] = React.useState(true);

  const handleUserBlur = async (e, setFieldError, setTouched) => {
    const userName = e.target.value;
    setTouched({ userName: true });
    const userExists = await userExist(userName);
    if (userExists) {
      setFieldError("userName", "Este nombre de usuario ya está registrado.");
      setIsUserAvailable(false);
    } else {
      setIsUserAvailable(true);
    }
  };
    return (
        <div className={styles.formContainer}>
        <h1>Registrate en la clínica</h1>
        <Formik
      initialValues={{ email: '', password: '',passwordRepeat:'', name:'', birthday:'', nDni:'', userName:'',birthday:''}}
      validate={validateRegister}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        postData(values)
        setSubmitting(false)
        resetForm()
      }}
    >
      {({ isSubmitting, errors, setFieldError, setTouched }) => (
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

          <label htmlFor="userName">Nombre de usuario</label>
          <Field
            name="userName" type="text"
            onBlur={(e) => handleUserBlur(e, setFieldError, setTouched)}
          />
          <ErrorMessage name="userName" component="div" />

          <label>Contraseña:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />

          <label>Repetí la contraseña:</label>
          <Field type="password" name="passwordRepeat" />
          <ErrorMessage name="passwordRepeat" component="div" />


          <button type="submit" disabled={isSubmitting||errors.email||errors.userName||errors.password||errors.birthday}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
        </div>
    )

}

export default Register;