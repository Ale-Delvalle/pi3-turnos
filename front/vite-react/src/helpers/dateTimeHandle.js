export function validarFecha(fecha) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaIngresada = new Date(fecha);
    fechaIngresada.setHours(0, 0, 0, 0);
  
    if (fechaIngresada <= hoy) {
      return true;
    }
  }

export function validarDiaHabil(fecha) {
    const fechaIngresada = new Date(fecha);
    const dia = fechaIngresada.getDay();

    console.log(`Valor de 'dia': ${dia}`)
    if (dia === 5 || dia === 6) {
      return true;
    }else{
        return false;
    }
  }

  export function validarHorario(hora) {
    const [horas, minutos] = hora.split(":").map(Number);
  
    // Validar que la hora esté entre las 7:00 y las 22:00
    if (horas < 7 || horas > 22 || (horas === 22 && minutos > 0)) {
      return true
    }
  }