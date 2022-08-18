import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('quests')
export class Quest {
    @PrimaryGeneratedColumn()
    qId: number
    @Column({ width: 250 })
    title: string
    @Column({ type: 'text' })
    description: string
    @Column({ width: 50 })
    activityType: string
    @Column({ width: 15 })
    goalUnit: string
    @Column({ width: 5 })
    goalValue: number
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @Column({default: false})
    isTrash: boolean;
}