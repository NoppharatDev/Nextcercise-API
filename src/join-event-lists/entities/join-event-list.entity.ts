import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("joinEventList")
export class JoinEventList {
    @PrimaryGeneratedColumn()
    jelId: number;
    @Column()
    jeId: number;
    @Column()
    cpOrder: number;
    @Column()
    cpId: number;
    @Column({ default: false })
    isSuccess: boolean;
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}