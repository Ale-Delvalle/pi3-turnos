import {Request,Response} from 'express'
import { cancelAppointmentService, createAppointmentService, getAllAppointmentsService, getAppointmentByIdService} from '../services/appointmentService'
import IAppointmentDto from '../dtos/IAppointmentDto';
import Appointment from '../entities/Appointment';

export const verTurnos = async (req:Request,res:Response) => {
    try {
        const appointments:Appointment[] = await getAllAppointmentsService();
        res.status(200).json(appointments)
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}

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