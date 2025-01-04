import {Request,Response} from 'express'
import { createUserService, getAllUsersService,getUserByIdService,findUser, turnosPorUsuarioService } from '../services/userService'
import User from '../entities/User'
import IUserDto from '../dtos/IUserDto'
import Credential from '../entities/Credential'
import { validateCredential } from '../services/credentialService'
import Appointment from '../entities/Appointment'

export const getAllUsers = async (req:Request,res:Response) => {
    try {
        const users: User[] = await getAllUsersService();
        res.status(200).json(users)
    } catch (error:any) {
        res.status(400).json({error: error.message})
        
    }
}

export const turnosPorUsuario = async (req:Request,res:Response) => {
    try {
        const {id}=req.params;
        const user:Appointment[]= await turnosPorUsuarioService(Number(id));
        res.status(200).json(user)
    } catch (error:any) {
        res.status(404).json({error:error.message})
    }
}

export const getUserById = async (req:Request,res:Response) => {
    try {
        const {id}=req.params;
        const user:User = await getUserByIdService(Number(id));
        res.status(200).json(user)
    } catch (error:any) {
        res.status(404).json({error:error.message})
    }
}
export const register = async (req:Request,res:Response) => {
    try {
        const {name,email,userName,password,birthday,nDni}:IUserDto=req.body;
        const newUser:User = await createUserService({
            name,email,userName,password,birthday,nDni
        })
        res.status(201).json(newUser)
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}
export const login = async (req:Request,res:Response) => {
    try {
        const {userName,password}=req.body;
        const credential:Credential = await validateCredential({userName,password})
        const user:User|null = await findUser(credential.id)
        res.status(200).json({
            user
        })
    } catch (error:any) {
        res.status(400).json({error:error.message})
    }
}