import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entity/user';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    global: true,
    secret:  "JWT_ACCESS_TOKEN_SECRET",
    signOptions: { expiresIn:  "1d"},
  }),
  PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false,
}),],
  exports: [TypeOrmModule,PassportModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
