import {
  BeansClass,
  CookingMethod,
  Country,
  DegreeOfRoasting,
  ProcessingType,
} from 'src/dto/coffe.dto';
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'coffe' })
export class Coffe {
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

  @ManyToOne(() => User, (user) => user.id)
  creator: string;

  @Column()
  cookingMethod: CookingMethod;

  @Column()
  degreeOfRoasting: DegreeOfRoasting;

  @Column()
  country: Country;

  @Column()
  processingType: ProcessingType;
}
