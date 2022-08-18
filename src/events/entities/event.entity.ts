import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("events")
export class Event {
    @Column({ primary: true, type: 'uuid' })
    eId: string;
    @Column()
    title: string;
    @Column({ type: 'date' })
    periodStart: Date;
    @Column({ type: 'date' })
    periodEnd: Date;
    @Column()
    description: string;
    @Column()
    rewardId: string;
    @Column()
    hostCode: string;
    @Column()
    hostDetail: string;
    @Column()
    header: string;
    @Column()
    banner: string;
    @Column()
    visual: string;
    @Column({ default: true })
    isPublish: boolean;
    @Column({ default: false })
    isDraft: boolean;
    @Column({ default: false })
    isTrash: boolean;
    @Column({ default: false })
    isNoPath: boolean;
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}

@Entity("eventDraft")
export class EventDraft extends Event {}

@Entity("questInEvent")
export class QuestInEvent {
    @PrimaryGeneratedColumn()
    qeId: number;
    @Column()
    eId: number;
    @Column()
    qId: number;
}