import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("joinEvent")
export class JoinEvent {
    @PrimaryGeneratedColumn()
    jeId: number;
    @Column({ primary: true, type: 'uuid' })
    eId: string;
    @Column()
    uId: string;
    @CreateDateColumn()
    joinedAt: Date
}