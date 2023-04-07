import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/entity/order-item';
import { OrderItemRepossitory } from 'src/repositories/order-item-repository';
import { OrderItemService } from 'src/services/order-item.service';
import { CoffeModule } from './coffe.module';
import { UserModule } from './user.module';

@Module({
  providers: [OrderItemService, OrderItemRepossitory],
  imports: [TypeOrmModule.forFeature([OrderItem]), CoffeModule],
  exports: [CoffeModule, OrderItemService],
})
export class OrderItemModule {}
