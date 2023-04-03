import { Module } from '@nestjs/common';
import { CoffeModule } from './moduls/coffe.module';
import { ConfigModule , ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffe } from './entity/coffe';
import { AuthModule } from './moduls/auth.module';
import { User } from './entity/user';
import { UserService } from './services/user.service';
import { UserModule } from './moduls/user.module';
import { UserController } from './controllers/user.controller';
import { PassportModule } from '@nestjs/passport';
import { CoffeService } from './services/coffe.service';
import { CoffeController } from './controllers/coffe.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

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
    UserModule],
  controllers: [UserController,CoffeController,AuthController],
  providers: [UserService,CoffeService,AuthService],
})
export class AppModule {}
