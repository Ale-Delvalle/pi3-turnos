import React, {useEffect, useState} from 'react'
import { validateLogin } from '../../helpers/validate'
import axios from 'axios'
import styles from './Login.module.css'
import { useContext } from "react";
import { UserDataContext } from '../../context/User';
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
    const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(UserDataContext)
    const navigate = useNavigate();

    const initialValues = {
        userName:'',
        password:''
    }

    const [isSubmitting, setIsSubmitting]=useState(false)
    const [formData,setFormData]=useState(initialValues)
    const [errors,setErrors]=useState(initialValues)

    const handleChange = (event) => {
        const {name,value}=event.target;
        setFormData({
            ...formData, [name]:value
        })
    }

    useEffect(() => {
        if (isLoggedIn) {
          navigate("/MisTurnos"); // Redirige al usuario al componente Home
        }
      }, [isLoggedIn]);

    useEffect(() => {
        const errors=validateLogin(formData)
        setErrors(errors)
    },[formData])

    useEffect(() => {
        if(user){
            console.log(`Userdata / Id: ${user.id}, User: ${user.userName} `)
        }else{
            console.log('Sin datos')
        }
    },[user])

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsSubmitting(true)
        postData();
    }

    const postData = async () => {
        try {
            // Nota: Se asume que el backend correrá en el puerto 3001
            const response = await axios.post('http://localhost:3001/users/login', formData)
            if(response.status === 200) {
                alert('Usuario logueado exitosamente')
                console.log(response)
                setIsLoggedIn(true)
                const credentials={id:response.data.user.id,userName:formData.userName, password:formData.password}
                setUser(credentials)
            }else{
                alert('El usuario NO se logueó exitosamente')
            }
        } catch (error) {
            console.log(error)
            setIsSubmitting(false)
            alert('El usuario no se pudo loguear')
        }
    }

    return (
        <div className={`${styles.formContainer} animate-fade-in-up`}>
            <div className={styles.formHeader}>
                <h1>Iniciar Sesión</h1>
                <p>Accede al portal médico de la clínica</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Usuario</label>
                    <input 
                        type="text" 
                        name='userName' 
                        placeholder='Tu nombre de usuario'
                        className={styles.input}
                        value={formData.userName} 
                        onChange={handleChange}
                    />
                    {errors.userName && <span className={styles.errorSpan}>{errors.userName}</span>}
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Contraseña</label>
                    <input 
                        type="password" 
                        name='password' 
                        placeholder='••••••••'
                        className={styles.input}
                        value={formData.password} 
                        onChange={handleChange}
                    />
                    {errors.password && <span className={styles.errorSpan}>{errors.password}</span>}
                </div>

                <button 
                    disabled={isSubmitting || errors.userName || errors.password} 
                    type='submit'
                    className={styles.submitBtn}
                >
                    {isSubmitting ? 'Enviando...' : 'Ingresar'}
                </button>
                
                {isSubmitting && <span className={styles.submittingText}>Verificando credenciales...</span>}
            </form>
            
            <div className={styles.formFooter}>
                <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            </div>
        </div>
    )
}

export default Login