import { BeansClass } from "src/dto/coffe.dto";
import { Entity,Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from "typeorm";


@Entity({name :'coffe'})
export class Coffe{
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    beansClass: BeansClass;

   
    

}
