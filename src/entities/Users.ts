import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne,
    BaseEntity, JoinTable
  } from 'typeorm';
  
   import {Favs} from "./Favs"
  @Entity()
  export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    first_name: string;
  
    @Column()
    last_name: string;
  
    @Column({unique: true})
    email: string;
  
    @Column({unique: true})
    password: string;
  
   @OneToMany(() => Favs, favs => favs.users)
    favs: Favs[];
    
  }