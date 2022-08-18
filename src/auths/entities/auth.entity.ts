import { Column, Entity } from "typeorm";

@Entity("auths")
export class Auth {
    @Column({ primary: true })
    uId: string;
    @Column()
    email: string;
    @Column()
    displayName: string;
    @Column()
    provider: string;
}