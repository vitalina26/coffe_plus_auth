import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemController } from 'src/controllers/order-item.controller';
import { OrderItem } from 'src/entity/order-item';
import { OrderItemRepossitory } from 'src/repositories/order-item-repository';
import { OrderItemService } from 'src/services/order-item.service';
import { AuthModule } from './auth.module';
import { CoffeModule } from './coffe.module';
import { OrderModule } from './order.module';
import { UserModule } from './user.module';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepossitory],
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    AuthModule,
    UserModule,
    CoffeModule,
    forwardRef(() => OrderModule),
  ],
  exports: [AuthModule, UserModule, CoffeModule, OrderItemRepossitory],
})
export class OrderItemModule {}
