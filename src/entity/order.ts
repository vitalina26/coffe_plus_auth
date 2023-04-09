import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  user_id: string;
  @Column('text', { array: true })
  items: string[];
}
export enum Status {
  PROCESSING = 'processing',
  FRAMED = 'framed',
  SENT = 'sent',
  DELIVERED = 'delivered',
}
