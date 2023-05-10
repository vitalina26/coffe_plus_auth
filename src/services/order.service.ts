import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderDto } from 'src/dto/orderDto';
import { Order, Status } from 'src/entity/order';
import { OrderItem } from 'src/entity/order-item';
import { OrderRepossitory } from 'src/repositories/order-repository';
import { v4 as uuidv4 } from 'uuid';
import { OrderItemService } from './order-item.service';
@Injectable()
export class OrderService {
  constructor(
    private orderItemService: OrderItemService,
    private orderRepository: OrderRepossitory,
  ) {}

  async create(owner_id: string, order_dto: OrderDto): Promise<Order> {
    const order = {
      id: uuidv4(),
      items_ids: [],
      items: [],
      status: Status.PROCESSING,
      date: new Date(),
      total_price: 0,
      user_id: owner_id,
    };
    await this.orderRepository.createOrder(order);
    const items: OrderItem[] = await Promise.all(
      order_dto.items.map((item) => {
        const orderItem = this.orderItemService.create(order.id, item);
        return orderItem;
      }),
    );
    const total_price = items.reduce((sum, b) => sum + b.price * b.quantity, 0);
    order.items = items;
    order.total_price = total_price;
    return await this.orderRepository.createOrder(order);
  }
  async findUsersAll(user_id: string): Promise<Order[]> {
    const response = await this.orderRepository.findUsersAll(user_id);
    return response.slice().sort(function (a, b) {
      const objB = new Date(b.date);
      const objA = new Date(a.date);
      return +objB - +objA;
    });
  }
  async findAll(): Promise<Order[]> {
    const response = await this.orderRepository.findAll();
    return response.slice().sort(function (a, b) {
      const objB = new Date(b.date);
      const objA = new Date(a.date);
      return +objB - +objA;
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOnebyId(id);
    if (!order) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return order;
  }
  async updateStatus(id: string, status: { status: string }) {
    const order = await this.orderRepository.findOnebyId(id);
    if (!order) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    console.log(status);
    await this.orderRepository.updateOrder(id, status);
    return await this.orderRepository.findOnebyId(id);
  }

  /*async update(id: string, updatedOrder: OrderUpdateDto): Promise<Order> {
    const order = await this.orderRepository.findOnebyId(id);
    if (!order) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    let user_upd;
    if (updatedOrder.items) {
      const items: OrderItem[] = await Promise.all(
        updatedOrder.items.map((item) => {
          const orderItem = this.orderItemService.findOne(item);
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
  }*/

  async remove(id: string): Promise<void> {
    const order = await this.orderRepository.findOnebyId(id);
    if (!order) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    await this.orderRepository.removeOrder(id);
  }
}
