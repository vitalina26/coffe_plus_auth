import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';
import {
  BeansClass,
  CookingMethod,
  Country,
  DegreeOfRoasting,
  ProcessingType,
} from '../dto/coffe.dto';

@Entity({ name: 'coffe' })
export class Coffe {
  @PrimaryColumn()
  id: string;

  @Column()
  img_url: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  beansClass: BeansClass;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: false,
  })
  creator_id: string;

  @Column()
  cookingMethod: CookingMethod;

  @Column()
  degreeOfRoasting: DegreeOfRoasting;

  @Column()
  country: Country;

  @Column()
  processingType: ProcessingType;
}
