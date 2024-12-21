import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({
    name:'credentials'
})

class Credential {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column()
    password: string
}

export default Credential