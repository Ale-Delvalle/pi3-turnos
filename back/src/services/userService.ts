import { userModel } from '../config/data-source'
import { credentialModel } from '../config/data-source'
import IUserDto from '../dtos/IUserDto'
import IUserExistDto from '../dtos/IUserExist'
import User from '../entities/User'
import Credential from '../entities/Credential'
import { createCredential } from './credentialService'
import Appointment from '../entities/Appointment'

export const getAllUsersService = async (): Promise<User[]> => {
    const users: User[] = await userModel.find();
    return users;
}

export const turnosPorUsuarioService = async (id:number): Promise<Appointment[]> =>{

    const foundUser = await userModel.findOne({
        where: { id },
        relations: ['appointments'],
    });

    if (!foundUser) throw new Error('El usuario no fue encontrado');

    return foundUser.appointments;
}

export const getUserByIdService = async (id:number): Promise<User> =>{
    const foundUser: User|null = await userModel.findOne({where:{id},relations:['appointments']})
    if(!foundUser) throw Error('El usuario no fue encontrado')
    return foundUser
}


export const createUserService = async (createUserDto:IUserDto): Promise<User> => {
    const newCredential:Credential = await createCredential({
        userName:createUserDto.userName,
        password:createUserDto.password
    })
    const newUser:User = await userModel.create(createUserDto)
    newUser.credential=newCredential
    await userModel.save(newUser)
    return newUser
}

export const findUserService = async (credentialId:number):Promise<User|null> => {
    const user:User|null = await userModel.findOneBy({credential: {id:credentialId}})
    return user
}


// export const isTheUserNameAvaiableService = async (userExistDto:IUserExistDto):Promise<object>=> {
//     const {userName}=userExistDto
//     const foundUser:Credential|null = await credentialModel.findOneBy({userName})
//     if(!foundUser){
//         return { userExist: true }
//     }else{
//         return { userExist:false}
//     }
// }