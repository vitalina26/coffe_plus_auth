import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { AuthModule } from './auth.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule],
})
export class OrderModule {}
