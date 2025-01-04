import {Request,Response} from 'express'
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService} from '../services/appointmentService'
// import {turnosPorUsuarioService} from '../services/appointmentService'
import IAppointmentDto from '../dtos/IAppointmentDto';
import Appointment from '../entities/Appointment';
import User from '../entities/User'


export const verTurnos = async (req:Request,res:Response) => {
    try {
        const appointments:Appointment[] = await getAllAppointmentsService();
        res.status(200).json(appointments)
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}

// export const turnosPorUsuarioController = async (req: Request, res: Response) => {
//   try {
//     const userId = parseInt(req.params.id); // Asumiendo que el ID del usuario llega como parámetro de ruta
//     if (isNaN(userId)) {
//       return res.status(400).json({ error: "ID de usuario inválido." });
//     }

//     const appointments = await turnosPorUsuarioService(userId);
//     res.status(200).json(appointments);
//   } catch (error) {
//     // Convierte 'error' al tipo conocido y maneja su propiedad 'message'
//     const errorMessage = error instanceof Error ? error.message : "Error desconocido";
//     res.status(500).json({ error: errorMessage });
//   }
// };

export const turnoPorId = async (req:Request,res:Response) => {
    try {
        const {id}=req.params
        const appointment:Appointment = await getAppointmentByIdService(Number(id))
        res.status(200).json(appointment)
    } catch (error:any) {
        res.status(404).json({error:error.message})
        
    }
}
export const nuevoTurno = async (req:Request,res:Response) => {
    try {
        const {date,time,status,userId,description}:IAppointmentDto=req.body;
        const newAppointment: Appointment = await createAppointmentService({
            date,time,status,userId,description
        })
        res.status(201).json(newAppointment)
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}

export const cancelarTurno = async (req:Request,res:Response) => {
    try {
        const {id}=req.params
        const newAppointment:Appointment = await cancelAppointmentService(Number(id))
        res.status(200).json(newAppointment)
    } catch (error:any) {
        res.status(404).json({error:error.message})
    }
}