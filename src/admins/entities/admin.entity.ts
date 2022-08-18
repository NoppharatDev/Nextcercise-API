
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    aId: number
    @Column({ width: 150 })
    email: string
    @Column()
    password: string
}