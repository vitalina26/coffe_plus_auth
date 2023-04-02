import { Module } from '@nestjs/common';
import { CoffeService } from '../services/coffe.service';
import { CoffeController } from '../controllers/coffe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffe } from 'src/entity/coffe';
import { AuthModule } from './auth.module';

@Module({
  controllers: [CoffeController],
  providers: [CoffeService],
  imports: [TypeOrmModule.forFeature([Coffe]),AuthModule],
})
export class CoffeModule {}
