import { appointmentModel, userModel } from "../config/data-source";
import IAppointmentDto from "../dtos/IAppointmentDto";
import Appointment from "../entities/Appointment";
import User from "../entities/User";

export const getAllAppointmentsService = async (): Promise<Appointment[]> =>{
    const appointments: Appointment[] = await appointmentModel.find();
    return appointments;
}

// export const turnosPorUsuarioService = async (userId: number): Promise<Appointment[]> => {
//   const user = await userModel.findOne({
//     where: { id: userId },
//     relations: ["appointments"], // Carga la relación appointments
//   });

//   if (!user) {
//     throw new Error("Usuario no encontrado.");
//   }
//   return user.appointments;
// };

    
export const getAppointmentByIdService = async (id:number):Promise<Appointment> => {
    const foundAppointment = await appointmentModel.findOneBy({id})
    if(!foundAppointment) throw Error ('El turno no fue encontrado')
        return foundAppointment
    }
    
export const createAppointmentService = async (createAppointmentDto:IAppointmentDto) => {
    const newAppointment:Appointment = await appointmentModel.create(createAppointmentDto)
    const user:User|null = await userModel.findOneBy({id:createAppointmentDto.userId})
    newAppointment.user=user;
    await appointmentModel.save(newAppointment)
    return newAppointment
}

export const cancelAppointmentService = async (appointmentId:number) => {
    const foundAppointment = await appointmentModel.findOneBy({id:appointmentId})
    if(!foundAppointment) throw Error('No existe el turno')
    foundAppointment.status='Cancelled'
    await appointmentModel.save(foundAppointment);
    return foundAppointment
}