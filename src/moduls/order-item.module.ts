import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from 'src/controllers/order-item.controller';
import { OrderItem } from 'src/entity/order-item';
import { OrderItemService } from 'src/services/order-item.service';
import { AuthModule } from './auth.module';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  imports: [TypeOrmModule.forFeature([OrderItem]), AuthModule],
})
export class OrderItemModule {}
