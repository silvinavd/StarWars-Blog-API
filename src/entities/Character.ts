import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany,
    BaseEntity, JoinTable
} from 'typeorm';

import {Favs} from "./Favs";
import {Users} from "./Users";


@Entity()
export class Character extends BaseEntity {
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
}