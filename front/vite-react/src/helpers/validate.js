import { validarFecha, validarDiaHabil, validarHorario } from "./dateTimeHandle";

export const validateRegister = (values) => {
    const errors = {};

    if(!/^[a-zA-Z\s]+$/.test(values.name)){
      errors.name='Solo se aceptan letras sin acentos'
    }
    if (!values.email) {
      errors.email = 'Ingresa tu e-mail';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Dirección de e-mail inválida';
    } 
    if(values.birthday===''){
      errors.birthday = 'Falta indicar la fecha'
    }
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(values.password)){
      errors.password='La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un número.'
    }else if(!/^\d+$/.test(values.nDni)){
      errors.nDni='Solo se aceptan números'
    }else if(!/^(?=.*[a-zA-Z\d].*)[a-zA-Z\d._-]{5,}$/.test(values.userName)){
      errors.userName='El usuario debe ser de al menos 5 caracteres y solo se admiten letras, numeros, puntos y guiones medios y bajos (- _)'
    }
    else if(values.password!==values.passwordRepeat){
      errors.password='Las contraseñas son diferentes'
    }
    return errors;
}

export const validateLogin = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = 'Falta ingresar el usuario';
  } else if (values.userName && !values.password) {
    errors.password = 'Falta ingresar la contraseña';
  }
  return errors;
}

export const validateAppointment = (values) => {
  const errors = {}
  
  if (validarFecha(values.date)) {
      errors.date = 'La fecha debe ser elegida con 48 hs de anticipo.'
  }else if(validarDiaHabil(values.date)){
    errors.date = 'Solo se pueden agendar turnos de lunes a viernes'
  }
  else if(values.date===''){
    errors.date = 'Falta indicar la fecha'
  }else if(validarHorario(values.time)){
    errors.time = 'Solo se pueden agendar turnos entre las 7 hs y las 22 hs'
  }
  if(values.time===''){
    errors.time = 'Por favor indica la hora'
  }else if(!values.description){
    errors.description = 'Indica los detalles del turno'
  }
  return errors
}