import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateRegister } from '../../helpers/validate';
import axios from 'axios';
import styles from './Register.module.css'
import { Link } from 'react-router-dom';

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
        alert('El usuario no se pudo registrar')
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
        <div className={`${styles.formContainer} animate-fade-in-up`}>
          <div className={styles.formHeader}>
              <h1>Crear Cuenta</h1>
              <p>Regístrate para gestionar tus turnos médicos</p>
          </div>
          <Formik
            initialValues={{ email: '', password: '', passwordRepeat:'', name:'', birthday:'', nDni:'', userName:'' }}
            validate={validateRegister}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              postData(values)
              setSubmitting(false)
              resetForm()
            }}
          >
            {({ isSubmitting, errors, setFieldError, setTouched }) => (
              <Form className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Nombre Completo</label>
                    <Field type="text" name="name" className={styles.input} placeholder="Juan Pérez" />
                    <ErrorMessage name="name" component="span" className={styles.errorSpan} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Correo Electrónico</label>
                    <Field type="email" name="email" className={styles.input} placeholder="correo@ejemplo.com" />
                    <ErrorMessage name="email" component="span" className={styles.errorSpan} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Fecha de Nacimiento</label>
                    <Field type="date" name="birthday" className={styles.input} />
                    <ErrorMessage name="birthday" component="span" className={styles.errorSpan} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>DNI / Identificación</label>
                    <Field type="number" name="nDni" className={styles.input} placeholder="Número de DNI" />
                    <ErrorMessage name="nDni" component="span" className={styles.errorSpan} />
                  </div>

                  <div className={styles.inputGroupFull}>
                    <label className={styles.label} htmlFor="userName">Nombre de Usuario</label>
                    <Field
                      name="userName" 
                      type="text"
                      className={styles.input}
                      placeholder="nombre_usuario"
                      onBlur={(e) => handleUserBlur(e, setFieldError, setTouched)}
                    />
                    <ErrorMessage name="userName" component="span" className={styles.errorSpan} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Contraseña</label>
                    <Field type="password" name="password" className={styles.input} placeholder="••••••••" />
                    <ErrorMessage name="password" component="span" className={styles.errorSpan} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Repetir Contraseña</label>
                    <Field type="password" name="passwordRepeat" className={styles.input} placeholder="••••••••" />
                    <ErrorMessage name="passwordRepeat" component="span" className={styles.errorSpan} />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || errors.email || errors.userName || errors.password || errors.birthday}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </button>
              </Form>
            )}
          </Formik>
          
          <div className={styles.formFooter}>
              <p>¿Ya tienes una cuenta? <Link to="/entrar">Inicia sesión</Link></p>
          </div>
        </div>
    )

}

export default Register;