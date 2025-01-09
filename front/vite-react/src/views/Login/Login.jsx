import React, {useEffect, useState} from 'react'
import { validateLogin } from '../../helpers/validate'
import axios from 'axios'
import styles from './Login.module.css'
import { useContext } from "react";
import { UserDataContext } from '../../context/User';
import { useNavigate } from "react-router-dom";


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
            const response = await axios.post('http://localhost:3001/users/login', formData)
            if(response.status === 200) {
                alert('Usuario logueado exitosamente')
                console.log(response)
                setIsLoggedIn(true)
                const credentials={id:response.data.user.id,userName:formData.userName, password:formData.password}
                setUser(credentials)
                // if(credentials){
                //     console.log(`La user data / User: ${credentials.userName}, Password:${credentials.password}`);
                // }else{
                //     console.log('Está vacio')
                // }
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
        <div className={styles.formContainer}>
            <h1>Ingresa al sistema de turnos</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario</label>
                    <input type="text" name='userName' placeholder='Usuario'
                    value={formData.userName} onChange={handleChange}/><br/>
                    {errors.userName && <span>{errors.userName}</span>}
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input type="password" name='password' placeholder='********'
                    value={formData.password} onChange={handleChange}/><br/>
                    {errors.password && <span>{errors.password}</span>}
                </div>

                <button disabled={isSubmitting||errors.userName||errors.password} type='submit'>Entrar</button>
                <br/>{isSubmitting && <span>Enviando formulario</span>}
            </form>
        </div>
    )
}

export default Login