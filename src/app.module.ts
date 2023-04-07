import { Module } from '@nestjs/common';
import { CoffeModule } from './moduls/coffe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffe } from './entity/coffe';
import { AuthModule } from './moduls/auth.module';
import { User } from './entity/user';
import { UserModule } from './moduls/user.module';
import { OrderModule } from './moduls/order.module';
import { OrderItemModule } from './moduls/order-item.module';
import { Order } from './entity/order';
import { OrderItem } from './entity/order-item';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Coffe, User, Order, OrderItem],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    CoffeModule,
    AuthModule,
    UserModule,
    OrderModule,
    OrderItemModule,
  ],
})
export class AppModule {}
