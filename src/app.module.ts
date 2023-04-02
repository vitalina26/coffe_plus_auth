import { Module } from '@nestjs/common';
import { CoffeModule } from './moduls/coffe.module';
import { ConfigModule , ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffe } from './entity/coffe';
import { AuthModule } from './moduls/auth.module';
import { User } from './entity/user';
import { UsersService } from './services/users.service';
import { UsersModule } from './moduls/user.module';
import { UsersController } from './controllers/user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Coffe,User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CoffeModule,
    AuthModule,
    UsersModule],
  controllers: [UsersController,],
  providers: [UsersService],
})
export class AppModule {}
