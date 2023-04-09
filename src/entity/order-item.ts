import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Coffe } from 'src/entity/coffe';
import { Order } from './order';

@Entity({ name: 'order-item' })
export class OrderItem {
  @PrimaryColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Coffe, (coffe) => coffe.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  coffe_id: string;
}
