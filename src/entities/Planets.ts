import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, 
    BaseEntity, JoinTable, JoinColumn, OneToOne
  } from 'typeorm';

  import {Favs} from "./Favs";
  import {Users} from "./Users";

  @Entity()
  export class Planets extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;    
    
    @Column()
    climate: string;
  
    @Column()
    diameter: number;
  
    @Column()
    rotation_period: number;
  
    @Column()
    orbital_period: number;

    @Column()
    gravity: string; 

    @OneToOne(() => Favs, favs => favs.planets) // specify inverse side as a second parameter
    favs: Favs;

  }