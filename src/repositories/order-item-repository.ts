import { Injectable } from '@nestjs/common/decorators';
import { OrderItemUpdateDto } from 'src/dto/orderItemUpdateDto';
import { OrderItem } from 'src/entity/order-item';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class OrderItemRepossitory extends Repository<OrderItem> {
  constructor(private dataSource: DataSource) {
    super(OrderItem, dataSource.createEntityManager());
  }

  async createOrderItem(order_item: OrderItem) {
    await this.save(order_item);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.find();
  }

  async findOnebyId(id: string): Promise<OrderItem> {
    return await this.findOne({
      where: { id },
    });
  }

  async updateOrderItem(
    id: string,
    updatedOrderItem: OrderItemUpdateDto,
  ): Promise<void> {
    await this.update({ id }, updatedOrderItem);
  }

  async removeOrderItem(id: string): Promise<void> {
    await this.delete({ id });
  }
}
