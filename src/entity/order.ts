import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
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

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  user_id: string;

  @OneToMany(() => OrderItem, (item) => item.order_id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  items: OrderItem[];
}
export enum Status {
  PROCESSING = 'processing',
  FRAMED = 'framed',
  SENT = 'sent',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}
