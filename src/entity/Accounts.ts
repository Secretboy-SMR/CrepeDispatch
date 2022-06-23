import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Accounts {

    @PrimaryGeneratedColumn()
    public AccountID?: number;

    @Column()
    public Username?: string;
    @Column()
    public RealName?: string;
    @Column()
    public Email?: string;
    @Column()
    public Token?: string;
    @Column()
    public Password?: string;
    @Column()
    public CountryCode?: string;
}