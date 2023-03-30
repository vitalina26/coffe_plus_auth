import { BeansClass } from "src/dto/coffe.dto";
import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";

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
    beansClass : BeansClass

}
