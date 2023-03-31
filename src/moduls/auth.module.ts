import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entity/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from 'src/password-strategy/access-token.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService,AccessTokenStrategy]
})
export class AuthModule {}
