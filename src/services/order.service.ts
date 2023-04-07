import {
  forwardRef,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { OrderDto } from 'src/dto/orderDto';
import { OrderUpdateDto } from 'src/dto/orderUpdateDto';
import { Order } from 'src/entity/order';
import { OrderItem } from 'src/entity/order-item';
import { OrderItemRepossitory } from 'src/repositories/order-item-repository';
import { OrderRepossitory } from 'src/repositories/order-repository';
import { UserRepossitory } from 'src/repositories/user-repository';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OrderService {
  constructor(
    @Inject(forwardRef(() => OrderItemRepossitory))
    private orderItemRepository: OrderItemRepossitory,
    private userRepository: UserRepossitory,
    private orderRepository: OrderRepossitory,
  ) {}

  async create(owner_id: string, order_dto: OrderDto): Promise<Order> {
    const user = await this.userRepository.findById(owner_id);
    let total_price = 0;
    if (!user) {
      throw new HttpException('NotFound user', HttpStatus.NOT_FOUND);
    }
    const items: OrderItem[] = await Promise.all(
      order_dto.items.map((item) => {
        const orderItem = this.orderItemRepository.findOnebyId(item);
        if (!orderItem) {
          throw new HttpException('NotFound orderItem', HttpStatus.NOT_FOUND);
        }
        return orderItem;
      }),
    );
    total_price = items.reduce((sum, b) => sum + b.price * b.quantity, 0);
    const order = {
      id: uuidv4(),
      items: items,
      status: order_dto.status,
      date: new Date(),
      total_price: total_price,
      user: user,
    };
    await this.orderRepository.createOrder(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOnebyId(id);
    if (!order) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async update(id: string, updatedOrder: OrderUpdateDto): Promise<Order> {
    const order = await this.orderRepository.findOnebyId(id);
    if (!order) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    let user_upd;
    if (updatedOrder.items) {
      const items: OrderItem[] = await Promise.all(
        updatedOrder.items.map((item) => {
          const orderItem = this.orderItemRepository.findOnebyId(item);
          if (!orderItem) {
            throw new HttpException('NotFound orderItem', HttpStatus.NOT_FOUND);
          }
          return orderItem;
        }),
      );
      const total_price = items.reduce(
        (sum, b) => sum + b.price * b.quantity,
        0,
      );
      user_upd.items = items;
      user_upd.total_price = total_price;
    }
    if (updatedOrder.status) {
      user_upd.status = updatedOrder.status;
    }

    await this.orderRepository.updateOrder(id, user_upd);
    return await this.orderRepository.findOnebyId(id);
  }

  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOnebyId(id);
    if (!order) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.orderItemRepository.removeOrderItem(id);
  }
}
