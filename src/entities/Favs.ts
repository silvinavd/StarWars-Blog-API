import {
    Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn,
    BaseEntity, JoinTable
} from 'typeorm';

import { Users } from "./Users";
import { People } from "./People";
import { Planets } from "./Planets";

@Entity()
export class Favs extends BaseEntity {
    @PrimaryGeneratedColumn()
    favouriteId: number;

    @ManyToOne(() => Users, users => users.favs)
    users: Users;

    @OneToOne(() => People, people => people.favs) // specify inverse side as a second parameter
    @JoinColumn()
    people: People;

    @OneToOne(() => Planets, planets => planets.favs) // specify inverse side as a second parameter
    @JoinColumn()
    planets: Planets;
}
