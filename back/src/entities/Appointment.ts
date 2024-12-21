import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import User from "./User"

@Entity({
    name:'appointments'
})
class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    time: string

    @ManyToOne(() => User, (user) => user.appointments)
    user: User|null

    @Column()
    description: string

    @Column()
    status: string
}

export default Appointment