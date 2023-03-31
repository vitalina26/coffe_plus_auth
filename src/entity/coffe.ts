import { BeansClass } from "src/dto/coffe.dto";
import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user";

@Entity({name :'coffe'})
export class Coffe{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    beansClass: BeansClass;

    @ManyToOne(() => User, (user) => user.coffes)
    user: User;
    

}
