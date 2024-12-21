import { userModel } from '../config/data-source'
import IUserDto from '../dtos/IUserDto'
import User from '../entities/User'
import Credential from '../entities/Credential'
import { createCredential } from './credentialService'

export const getAllUsersService = async (): Promise<User[]> => {
    const users: User[] = await userModel.find();
    return users;
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

export const findUser = async (credentialId:number):Promise<User|null> => {
    const user:User|null = await userModel.findOneBy({credential: {id:credentialId}})
    return user
}