import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderItemDto } from 'src/dto/order-item.dto';
import { OrderItem } from 'src/entity/order-item';
import { CoffeRepossitory } from 'src/repositories/coffe-repository';
import { OrderItemRepossitory } from 'src/repositories/order-item-repository';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OrderItemService {
  constructor(
    private coffeRepository: CoffeRepossitory,
    private orderItemRepository: OrderItemRepossitory,
  ) {}

  async create(
    order_id: string,
    order_item_dto: OrderItemDto,
  ): Promise<OrderItem> {
    const coffe = await this.coffeRepository.findOnebyId(
      order_item_dto.coffe_id,
    );
    if (!coffe) {
      throw new HttpException('NotFound coffe', HttpStatus.NOT_FOUND);
    }
    const order_item = {
      id: uuidv4(),
      coffe_id: order_item_dto.coffe_id,
      order_id: order_id,
      quantity: order_item_dto.quantity,
      price: coffe.price,
    };
    await this.orderItemRepository.createOrderItem(order_item);
    return order_item;
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }

  async findOne(id: string): Promise<OrderItem> {
    const order_item = await this.orderItemRepository.findOnebyId(id);
    if (!order_item) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return order_item;
  }

  /* async update(
    id: string,
    updatedOrderItem: OrderItemUpdateDto,
  ): Promise<OrderItem> {
    const order_item = await this.orderItemRepository.findOnebyId(id);
    if (!order_item) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.orderItemRepository.updateOrderItem(id, updatedOrderItem);

    return await this.orderItemRepository.findOnebyId(id);
  }*/

  async remove(id: string): Promise<void> {
    const order_item = await this.orderItemRepository.findOnebyId(id);
    if (!order_item) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.orderItemRepository.removeOrderItem(id);
  }
}
