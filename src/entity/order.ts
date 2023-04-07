import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item';
import { User } from './user';

@Entity({ name: 'order' })
export class Order {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  total_price: number;

  @Column()
  status: Status;

  @ManyToOne(() => User, (user) => user, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @OneToMany(() => OrderItem, (item) => item)
  items: OrderItem[];
}
export enum Status {}
