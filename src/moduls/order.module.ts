import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order';
import { OrderRepossitory } from 'src/repositories/order-repository';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { OrderItemModule } from './order-item.module';
import { UserModule } from './user.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepossitory],
  imports: [TypeOrmModule.forFeature([Order]), OrderItemModule, UserModule],
  exports: [],
})
export class OrderModule {}
