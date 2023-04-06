import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { User } from 'src/entity/user';
import { UserRepossitory } from 'src/repositories/user-repository';
import { UserService } from 'src/services/user.service';
import { AuthModule } from './auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepossitory],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  exports: [UserRepossitory],
})
export class UserModule {}
