import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable, JoinColumn, OneToOne
} from 'typeorm';

import {Favs} from "./Favs";
import {Users} from "./Users";


@Entity()
export class People extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    height: number;

    @Column()
    skin_color: string;


    @Column()
    eye_color: string;

    @OneToOne(() => Favs, favs => favs.people) // specify inverse side as a second parameter
    favs: Favs;
    // @OneToOne(() => Favs, favs => favs.people) // specify inverse side as a second parameter
    // @JoinColumn()
    // people: Favs;

}