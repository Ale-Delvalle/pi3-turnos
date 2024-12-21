import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
} from "typeorm"

import Credential from '../entities/Credential'
import Appointment from './Appointment'

@Entity({
    name:'users'
})

class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string
    
    @Column()
    birthday: string

    @Column()
    nDni: number

    @Column()
    name: string

    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential

    @OneToMany(() => Appointment, (appointments) => appointments.user)
    appointments: Appointment[]
}

export default User