import { Column, CreateDateColumn, Double, Entity, UpdateDateColumn } from "typeorm";

@Entity("checkpoint")
export class CheckPoint {
    @Column({ primary: true })
    eId: string
    @Column({ primary: true })
    cpId: string
    @Column({ primary: true })
    qId: number
    @Column()
    name: string
    @Column()
    summary: string
    @Column()
    desciption: string
    @Column("double precision")
    lat: Double
    @Column("double precision")
    long: Double
    @Column("double precision")
    length: Double
    @Column({ type: 'double precision' })
    positionX: Double
    @Column({ type: 'double precision' })
    positionY: Double
    @Column()
    startFile: string
    @Column()
    resultFile: string
    // @Column()
    // backgroundFile: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}