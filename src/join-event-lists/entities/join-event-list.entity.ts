import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("joinEventList")
export class JoinEventList {
    @PrimaryGeneratedColumn()
    jelId: number;
    @Column({ primary: true })
    jeId: number;
    @Column()
    cpOrder: number;
    @Column()
    cpId: number;
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}