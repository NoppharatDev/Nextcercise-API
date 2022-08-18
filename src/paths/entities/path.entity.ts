import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("paths")
export class Path {
    @Column({primary: true})
    pId: number;
    @Column({primary: true})
    eId: string
    @Column({primary: true})
    cpId: string
    @Column()
    cpOrder: number
}
