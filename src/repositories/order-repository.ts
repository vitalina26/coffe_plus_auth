import { Injectable } from '@nestjs/common/decorators';
import { Order } from 'src/entity/order';
import { Repository, DataSource, FindOperator } from 'typeorm';

@Injectable()
export class OrderRepossitory extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async createOrder(order: Order) {
    return await this.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.find();
  }
  async findUsersAll(id: string): Promise<Order[]> {
    return this.createQueryBuilder('order')
      .leftJoinAndSelect('order.user_id', 'user')
      .leftJoinAndSelect('order.items', 'order-item')
      .leftJoinAndSelect('order-item.coffe_id', 'coffe')
      .where('user.id = :id', { id })
      .getMany();
  }
  async findOnebyId(id: string): Promise<Order> {
    return await this.findOne({
      where: { id },
    });
  }

  async updateOrder(id: string, updatedOrder): Promise<void> {
    await this.update({ id }, updatedOrder);
    console.log(updatedOrder);
  }

  async removeOrder(id: string): Promise<void> {
    await this.delete({ id });
  }
}
