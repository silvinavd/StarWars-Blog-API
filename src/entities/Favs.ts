import {
    Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn,
    BaseEntity, JoinTable
} from 'typeorm';

import { Users } from "./Users";
import {People} from "./People";
import {Planets} from "./Planets";

@Entity()
export class Favs extends BaseEntity {
    @PrimaryGeneratedColumn()
    favouriteId: number;

    // @Column()
    // userId: string;

    @ManyToOne(() => Users, users => users.favs)
    users: Users;

    @OneToOne(() => Planets)
    @JoinColumn()
    planet: Planets;

    @OneToOne(() => People)
    @JoinColumn()
    people: People;
}
