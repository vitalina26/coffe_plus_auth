import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { OrderItemDto } from 'src/dto/order-item.dto';
import { OrderItemUpdateDto } from 'src/dto/orderItemUpdateDto';
import { OrderItem } from 'src/entity/order-item';
import { CoffeRepossitory } from 'src/repositories/coffe-repository';
import { OrderItemRepossitory } from 'src/repositories/order-item-repository';
import { OrderRepossitory } from 'src/repositories/order-repository';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OrderItemService {
  constructor(
    @Inject(forwardRef(() => OrderRepossitory))
    private orderRepository: OrderRepossitory,
    private coffeRepository: CoffeRepossitory,
    private orderItemRepository: OrderItemRepossitory,
  ) {}

  async create(order_item_dto: OrderItemDto): Promise<OrderItem> {
    const coffe = await this.coffeRepository.findOnebyId(
      order_item_dto.coffe_id,
    );
    const order = await this.orderRepository.findOnebyId(
      order_item_dto.order_id,
    );
    if (!(coffe && order)) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    const order_item = {
      id: uuidv4(),
      coffe: coffe,
      order: order,
      quantity: order_item_dto.quantity,
      price: order_item_dto.price,
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

  async update(
    id: string,
    updatedOrderItem: OrderItemUpdateDto,
  ): Promise<OrderItem> {
    const order_item = await this.orderItemRepository.findOnebyId(id);
    if (!order_item) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.orderItemRepository.updateOrderItem(id, updatedOrderItem);

    return await this.orderItemRepository.findOnebyId(id);
  }

  async remove(id: string): Promise<void> {
    const order_item = await this.orderItemRepository.findOnebyId(id);
    if (!order_item) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.orderItemRepository.removeOrderItem(id);
  }
}
